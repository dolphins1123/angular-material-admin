import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router'

import { Observable } from 'rxjs'
import { UserData } from '../model/domain'
import { TableService } from './Table.service'


@Injectable()
export class TableResolver implements Resolve<UserData[]> {
  constructor(private tableService: TableService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UserData[]> {
      return this.tableService.queryData();
  }
}
