import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRoles } from '../interface/roles.interface';
import { RoleService } from '../service/role.service';
import { firstValueFrom } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css'],
})
export class RoleListComponent {
  listOfData: IRoles[] = [];
  editCache: { [key: string]: { edit: boolean; data: IRoles } } = {};
  validateForm!: FormGroup;
  validateAddForm!: FormGroup;
  isVisible = false;
  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private notification: NzNotificationService,
  ) {}
  openModal(){
    this.isVisible = true;
  }

  handleOk(){
    if (this.validateAddForm.valid) {
      const role_data: IRoles =  {
        ...this.validateAddForm.value
      };
      console.log('submit', role_data);
      this.roleService.post_role(role_data).subscribe(res => {
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
  async ngOnInit(){
    this.validateForm = this.fb.group({
      name: ['', []],
      month: ['', []],
      less: ['', []],
      more: ['', []],
    });
    this.validateAddForm = this.fb.group({
      name: ['', []],
      description: ['', []],
    });
    this.listOfData = (await firstValueFrom(this.roleService.get_role()))
    this.updateEditCache();
  }
  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }
  refresh_data(){
    this.roleService.get_role().subscribe(res => {
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
    this.roleService.delete_role(id).subscribe(res => {
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
    this.roleService.patch_role(id, this.editCache[id].data).subscribe(res => this.refresh_data());
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
