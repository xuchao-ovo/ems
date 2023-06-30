import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaryListComponent } from './salary-list/salary-list.component';
import { SalaryAddComponent } from './salary-add/salary-add.component';

const routes: Routes = [
  { path: 'salary-list', component: SalaryListComponent },
  { path: 'salary-add', component: SalaryAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalariesRoutingModule {}
