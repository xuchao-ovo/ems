import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { IEmployee } from '../interface/employee.interface';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent {
  listOfData: IEmployee[] = [];
  editCache: { [key: string]: { edit: boolean; data: IEmployee } } = {};
  validateForm!: FormGroup;
  isVisible = false;
  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {}
  openModal(){
    this.isVisible = true;
  }

  handleOk(){
    
  }
  async ngOnInit() {
    this.listOfData = await (firstValueFrom(this.employeeService.get_employee()));
    // this.employeeService.get_employee().subscribe(res => {
    //   for (let i of res) {
    //     this.listOfData.push(i);
    //   }
    //   console.log(this.listOfData)
    // })
    // (await this.employeeService.get_employee()).subscribe(res => {
      
    //   for (let i of res) {
    //     this.listOfData.push({
    //       ...i
    //     });
    //   }
    //   console.log(this.listOfData)
    // })
    this.validateForm = this.fb.group({
      name: ['', []],
      month: ['', []],
      less: ['', []],
      more: ['', []],
    });

    
    this.updateEditCache();
  }


  deleteItem(id: string){
    this.employeeService.delete_employee(id).subscribe(res => {
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
    this.employeeService.patch_employee(id, this.editCache[id].data).subscribe(res => {
      // 刷新列表
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
