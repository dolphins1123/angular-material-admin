import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatButtonModule } from '@angular/material/button'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { SelectionModel } from '@angular/cdk/collections'
import { TableDataSource } from '../../../services/TableDataSource'
import { TableService, UserQuery } from '../../../services/Table.service'
import { UserData } from '../../../model/domain'
import { ActivatedRoute } from '@angular/router'
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
} from 'rxjs/operators'
import { merge, fromEvent } from 'rxjs'
import { ElementRef } from '@angular/core'
import { Sort } from 'src/app/services/page'
import { PaginatedDataSource } from 'src/app/services/paginated-datasource'

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
})
export class TablesComponent implements OnInit, AfterViewInit {
  displayedColumns = [
    'CustomerID',
    'CompanyName',
    'Address',
    'City',
    'management',
  ]

  initialSort: Sort<UserData> = { property: 'CompanyName', order: 'asc' }

  dataSource: TableDataSource //@@ KEN MatTableDataSource<UserData>;
  selection: SelectionModel<UserData>

  //ken
  //searchModel: any = {'pageSize': 10 , 'pageNum': 1,'filters':''};
  Customers: UserData[]
  Customer: UserData

  data: any

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator

  @ViewChild(MatSort, { static: true }) sort: MatSort

  @ViewChild('input', { static: true }) input: ElementRef
  constructor(
    private route: ActivatedRoute,
    private tableService: TableService
  ) {}

  ngOnInit() {
    this.Customers = this.route.snapshot.data['Customers']

    this.dataSource = new TableDataSource(this.tableService)

     this.dataSource.loadData('', 'asc', 1, 10)

    //way 3
    // this.data = new PaginatedDataSource<UserData, UserQuery>(
    //   //  (request, query) => this.tableService.page(request, query),
    //   (request, query) => this.tableService.page(request, query),
    //   this.initialSort,
    //   { search: '' }, // 放查詢條件
    //   1
    // )

    // console.log('data=', this.data)

    //  this.dataSource = this.data

    //以下PROMISE 寫法
    // let p1 = this.dataService.initData();
    // Promise.all([p1]).then(values => {
    //   console.log('p1=', values[0]); // [3, 1337, "foo"]
    //   this.foo = values[0];
    //   console.log('foo  final=', this.foo);
    //   this.dataSource = new MatTableDataSource(this.foo);

    //   this.selection = new SelectionModel<UserData>(true, []);
    // });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0))

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0

          this.loadDataPage()
        })
      )
      .subscribe()

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadDataPage()))
      .subscribe()
  }

  loadDataPage() {
    this.dataSource.loadData(
      // this.Customer.CustomerID,
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    )
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row)
  }

  onEdit(row) {
    console.log(' edit Row clicked: ', row)
  }

  onDelete(row) {
    console.log(' delete Row clicked: ', row)
  }
}
