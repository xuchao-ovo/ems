import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AttendanceService } from '../service/attendance.service';
import { firstValueFrom } from 'rxjs';
import { IAttendance } from '../interface/attendance.interface';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { EmployeeService } from '../../employees/service/employee.service';
import { IEmployee } from '../../employees/interface/employee.interface';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.css'],
})
export class AttendanceListComponent implements OnInit {
  listOfData: IAttendance[] = [];
  editCache: { [key: string]: { edit: boolean; data: IAttendance } } = {};
  validateForm!: FormGroup;
  validateAddForm!: FormGroup;
  selectedValue = '';
  isVisible = false;
  date = null;
  users_node!: IEmployee[];
  time_check_in: Date = new Date(Date.now());
  time_check_out: Date = new Date(Date.now());
  constructor(
    private fb: FormBuilder,
    private attendanceService: AttendanceService,
    private notification: NzNotificationService,
    private employeeService: EmployeeService
  ) {}
  openModal(){
    this.isVisible = true;
  }

  handleOk(){
    if (this.validateAddForm.valid) {
      const attendance_data: IAttendance =  {
        ...this.validateAddForm.value,
        check_in: this.time_check_in,
        check_out: this.time_check_out
      };
      console.log('submit', attendance_data);
      this.attendanceService.post_attendance(attendance_data).subscribe(res => {
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
  changeTime(time: Date){
    console.log(time);
  }
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  refresh_data(){
    this.attendanceService.get_attendance().subscribe(res => {
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
      date_time: ['', []],
      check_in: [null, []],
      check_out: [null, []],
      leave_reason: ['', []]
    });
    
    // load data
    this.listOfData = (await firstValueFrom(this.attendanceService.get_attendance()))
    this.users_node = (await firstValueFrom(this.employeeService.get_employee()))
    console.log(this.listOfData);
    this.updateEditCache();
  }
  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }
  deleteItem(id: string){
    this.attendanceService.delete_attendance(id).subscribe(res => {
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
