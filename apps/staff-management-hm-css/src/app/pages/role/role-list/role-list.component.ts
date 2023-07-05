import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRoles } from '../interface/roles.interface';
import { RoleService } from '../service/role.service';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css'],
})
export class RoleListComponent {
  listOfData: IRoles[] = [];
  editCache: { [key: string]: { edit: boolean; data: IRoles } } = {};
  validateForm!: FormGroup;
  isVisible = false;
  constructor(
    private fb: FormBuilder,
    private roleService: RoleService
  ) {}
  openModal(){
    this.isVisible = true;
  }

  handleOk(){
    
  }
  async ngOnInit(){
    this.validateForm = this.fb.group({
      name: ['', []],
      month: ['', []],
      less: ['', []],
      more: ['', []],
    });
    this.listOfData = (await firstValueFrom(this.roleService.get_employee()))


    // for (let i = 0; i < 100; i++) {
    //   this.listOfData.push({
    //     id: Math.round(Math.random() * 10000 + 1).toString(),
    //     name: `Pang ${i}`,
    //     month: Math.round(Math.random() * 12 + 1),
    //     attendance_day_num: Math.round(Math.random() * 30 + 1),
    //   });
    // }
    this.updateEditCache();
  }
  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }
  deleteItem(id: string){
    this.roleService.delete_employee(id).subscribe(res => {
      // 刷新列表数据
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
