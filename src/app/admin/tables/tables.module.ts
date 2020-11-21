import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatCheckboxModule } from '@angular/material/checkbox'

import { TablesRoutingModule } from './tables-routing.module'
import { TablesComponent } from './tables/tables.component'
import { TableService } from '../../services/Table.service'
import { TableResolver } from './../../services/Table.resolver'
import { MatButtonModule } from '@angular/material/button'
@NgModule({
  imports: [
    CommonModule,
    TablesRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  declarations: [TablesComponent],
  providers: [TableService, TableResolver],
})
export class TablesModule {}
