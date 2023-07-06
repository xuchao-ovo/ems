import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AttendanceService } from '../service/attendance.service';
import { firstValueFrom } from 'rxjs';
import { IAttendance } from '../interface/attendance.interface';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.css'],
})
export class AttendanceListComponent implements OnInit {
  listOfData: IAttendance[] = [];
  editCache: { [key: string]: { edit: boolean; data: IAttendance } } = {};
  validateForm!: FormGroup;
  isVisible = false;
  date = null;
  constructor(
    private fb: FormBuilder,
    private attendanceService: AttendanceService
  ) {}
  openModal(){
    this.isVisible = true;
  }

  handleOk(){
    
  }
  async ngOnInit() {
    this.listOfData = (await firstValueFrom(this.attendanceService.get_attendance()))
    this.validateForm = this.fb.group({
      name: [null, []],
      month: [null, []],
      less: [null, []],
      more: [null, []],
    });

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
    this.attendanceService.delete_attendance(id).subscribe(res => {
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
