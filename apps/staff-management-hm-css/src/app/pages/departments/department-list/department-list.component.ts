import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDepartments } from '../interface/departments.interface';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DepartmentService } from '../service/department.service';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css'],
})
export class DepartmentListComponent {
  listOfData: IDepartments[] = [];
  editCache: { [key: string]: { edit: boolean; data: IDepartments } } = {};
  validateForm!: FormGroup;
  validateAddForm!: FormGroup;
  isVisible = false;

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private departmentService: DepartmentService
  ) {}
  openModal(){
    this.isVisible = true;
  }

  handleOk(){
    if (this.validateAddForm.valid) {
      const role_data: IDepartments =  {
        ...this.validateAddForm.value
      };
      console.log('submit', role_data);
      this.departmentService.post_department(role_data).subscribe(res => {
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

  async ngOnInit() {
    this.validateForm = this.fb.group({
      name: [null, []],
      month: [null, []],
      less: [null, []],
      more: [null, []],
    });
    this.validateAddForm = this.fb.group({
      name: ['', []],
      description: ['', []],
    });
    this.listOfData = (await firstValueFrom(this.departmentService.get_department()))
    this.updateEditCache();
  }
  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }
  refresh_data(){
    this.departmentService.get_department().subscribe(res => {
      this.listOfData = res;
      this.updateEditCache();
      this.notification.create(
        'success',
        '通知',
        '操作成功。'
      );
    })
  }
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  deleteItem(id: string){
    this.departmentService.delete_department(id).subscribe(res => {
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
    this.departmentService.patch_department(id, this.editCache[id].data).subscribe(res => this.refresh_data());
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
