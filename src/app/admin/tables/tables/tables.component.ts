import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserData, DataService } from '../data.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit, AfterViewInit {
  displayedColumns = [ 'CustomerID','CompanyName', 'Address', 'City']; //'select',, 'CompanyName', 'Address', 'City'
  dataSource: MatTableDataSource<UserData>;
  selection: SelectionModel<UserData>;

  //ken
//searchModel: any = {'pageSize': 10 , 'pageNum': 1,'filters':''};
  foo: UserData[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private readonly dataService: DataService) {}

  ngOnInit() {
    let p1 = this.dataService.initData();
    
   
    
    Promise.all([p1]).then(values => {
      console.log('p1=', values[0]); // [3, 1337, "foo"] 
      this.foo = values[0];
      console.log('foo  final=', this.foo);
      this.dataSource = new MatTableDataSource(this.foo);
   
      this.selection = new SelectionModel<UserData>(true, []);
    });
    

    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  
onRowClicked(row) {
    console.log('Row clicked: ', row);
}
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
