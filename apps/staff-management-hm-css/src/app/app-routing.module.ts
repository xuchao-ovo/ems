import { NgModule, inject } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './auth/login/login.component'
import { RegisterComponent } from './auth/register/register.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AuthGuard } from './guard/guard'

const routes: Routes = [
  // 默认打开面板界面（这个要验证是否登陆）
  { path: '', pathMatch: 'full', redirectTo: '/Home' },
  {
    path: 'Login', component: LoginComponent
  },
  {
    path: 'Register', component: RegisterComponent
  },
  {
    path: '404', component: PageNotFoundComponent
  },
  {
    path: 'Home',
    component: HomeComponent,
    canActivate:[() => inject(AuthGuard).canActivate()],
    children: [
      {
        path: 'welcome',
        loadChildren: () =>
          import('./pages/welcome/welcome.module').then((m) => m.WelcomeModule),
      },
      {
        path: 'Attendance',
        loadChildren: () =>
          import('./pages/attendance/attendance.module').then(
            (m) => m.AttendanceModule
          ),
      },
      {
        path: 'Departments',
        loadChildren: () =>
          import('./pages/departments/departments.module').then(
            (m) => m.DepartmentsModule
          ),
      },
      {
        path: 'Employees',
        loadChildren: () =>
          import('./pages/employees/employees.module').then(
            (m) => m.EmployeesModule
          ),
      },
      {
        path: 'Role',
        loadChildren: () =>
          import('./pages/role/role.module').then((m) => m.RoleModule),
      },
      {
        path: 'Salaries',
        loadChildren: () =>
          import('./pages/salaries/salaries.module').then(
            (m) => m.SalariesModule
          ),
      },
      {
        path: 'Page-Not-Found',
        loadChildren: () =>
          import('./pages/page-not-found/page-not-found.module').then(
            (m) => m.PageNotFoundModule
          ),
      },
      {
        path: '**',
        component: PageNotFoundComponent
      },
    ],
  },
  { path: '**', pathMatch: 'full', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
