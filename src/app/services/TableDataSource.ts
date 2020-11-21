import { CollectionViewer, DataSource } from '@angular/cdk/collections'
import { Observable, BehaviorSubject, of } from 'rxjs'
//import {Lesson} from "../model/lesson";
import { UserData } from '../model/domain'
import { TableService } from './Table.service'
import { catchError, finalize } from 'rxjs/operators'

export class TableDataSource implements DataSource<UserData> {
  private lessonsSubject = new BehaviorSubject<UserData[]>([])

  private loadingSubject = new BehaviorSubject<boolean>(false)

  public loading$ = this.loadingSubject.asObservable()

  constructor(private tableService: TableService) {}

  loadData(
    filter: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ) {
    console.log('pageIndex=', pageIndex)

    this.loadingSubject.next(true)

    this.tableService
      .queryData(filter, sortDirection, pageIndex, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((resp) => this.lessonsSubject.next(resp))
  }

  connect(collectionViewer: CollectionViewer): Observable<UserData[]> {
    console.log('Connecting data source')
    return this.lessonsSubject.asObservable()
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.lessonsSubject.complete()
    this.loadingSubject.complete()
  }
}
