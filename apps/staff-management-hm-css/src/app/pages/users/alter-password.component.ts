import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from './service/users.service';

@Component({
  selector: 'app-alter-password',
  templateUrl: './alter-password.component.html',
  styleUrls: ['./alter-password.component.css'],
})
export class AlterPasswordComponent {
  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private userService: UserService
  ){}
  validateForm: FormGroup = this.fb.group({
    password: ['', Validators.required],
    new_password: ['',Validators.required],
    re_password: ['',Validators.required],
  });


  async submitForm() {
    if (this.validateForm.valid) {
      const {password ,new_password, re_password} = this.validateForm.value
      if(new_password != re_password){
        this.notification.create(
          'error',
          '错误',
          '请确认新密码与确认密码是否一样。'
        );
        return;
      }
      console.log('submit', this.validateForm.value);
      this.userService.alter_user({
        password: password,
        new_password: new_password,
        re_password: re_password
      }).subscribe(res => {
        localStorage.clear();
        location.reload();
        this.notification.create(
          res.code == 200? 'success' : 'error',
          res.code == 200? '提示' : '错误',
          res.message
        );
      })
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
