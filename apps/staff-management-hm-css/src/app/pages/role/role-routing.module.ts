import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleAddComponent } from './role-add/role-add.component';
import { RoleListComponent } from './role-list/role-list.component';

const routes: Routes = [
  { path: 'role-list', component: RoleListComponent },
  { path: 'role-add', component: RoleAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoleRoutingModule {}
