import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { Routes, RouterModule } from '@angular/router'
import { TableResolver } from 'src/app/services/Table.resolver'
import { TablesComponent } from './tables/tables.component'

const routes: Routes = [
  {
    path: '',
    component: TablesComponent,
    resolve: {
      tableResolver: TableResolver,
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes), MatButtonModule],
  exports: [RouterModule],
})
export class TablesRoutingModule {}
