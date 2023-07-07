import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISalary } from '../interface/salary.interface';
import { SalaryService } from '../service/salary.service';
import { firstValueFrom } from 'rxjs';
import { IEmployee } from '../../employees/interface/employee.interface';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { EmployeeService } from '../../employees/service/employee.service';

@Component({
  selector: 'app-salary-list',
  templateUrl: './salary-list.component.html',
  styleUrls: ['./salary-list.component.css'],
})
export class SalaryListComponent {
  listOfData: ISalary[] = [];
  editCache: { [key: string]: { edit: boolean; data: ISalary } } = {};
  validateForm!: FormGroup;
  validateAddForm!: FormGroup;

  isVisible = false;
  users_node!: IEmployee[];
  selectedValue = '';

  formatterDollar = (value: number): string => `${value} ￥`;
  parserDollar = (value: string): string => value.replace(' ￥', '');

  constructor(
    private fb: FormBuilder,
    private salaryService: SalaryService,
    private notification: NzNotificationService,
    private employeeService: EmployeeService
  ) {}
  openModal(){
    this.isVisible = true;
  }

  handleOk(){
    if (this.validateAddForm.valid) {
      const salary_data: ISalary =  {
        ...this.validateAddForm.value
      };
      console.log('submit', salary_data);
      this.salaryService.post_salary(salary_data).subscribe(res => {
        this.refresh_data();
      })
    } else {
      Object.values(this.validateAddForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  refresh_data(){
    this.salaryService.get_salary().subscribe(res => {
      this.listOfData = res;
      this.updateEditCache();
      this.notification.create(
        'success',
        '通知',
        '操作成功。'
      );
    })
  }

  async ngOnInit() {

    this.validateForm = this.fb.group({
      name: [null, []],
      month: [null, []],
      less: [null, []],
      more: [null, []],
    });

    this.validateAddForm = this.fb.group({
      employee_id: ['', []],
      salary_month: [null, []],
      basic_salary: ['', []],
      bonus: ['', []],
      deduction: ['', []],
      total_salary: ['', []]
    });

    this.listOfData = (await firstValueFrom(this.salaryService.get_salary()))
    this.users_node = (await firstValueFrom(this.employeeService.get_employee()))

    this.updateEditCache();
  }
  deleteItem(id: string){
    this.salaryService.delete_salary(id).subscribe(res => {
      // 刷新列表数据
      this.refresh_data();
    })
  }
  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  genderChange(value: string): void {
    this.validateForm
      .get('note')!
      .setValue(value === 'male' ? 'Hi, man!' : 'Hi, lady!');
  }

  startEdit(id: string): void {
    console.log(`${id} 正在编辑`);
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex((item) => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false,
    };
  }

  saveEdit(id: string): void {
    const index = this.listOfData.findIndex((item) => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.salaryService.patch_salary(id, this.editCache[id].data).subscribe(res => {
      this.refresh_data();
    })
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach((item) => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item },
      };
    });
  }
}
