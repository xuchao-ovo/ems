import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup } from '@angular/forms'
import { NzNotificationService } from "ng-zorro-antd/notification";
import { RegisterForm, Steps_Struct, departments, node_department } from "./register.interface";
import { RegisterService } from "./register.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
  index = 0;
  formatterAge = (value: number): string => `${value} 岁`;
  parserAge = (value: string): string => value.replace('岁 ', '');
  expandKeys = ['100', '1001'];
  value?: string;
  registerForm: FormGroup = this.fb.group({
    username: ['',],
    password: ['',],
    password2: ['',],
    name: ['',],
    age: ['18'],
    gender: ['M',],
    department_id: ['',],
    position: ['',],
    agree: ['']
  });
  // 部门信息获取
  nodes: node_department[] = []

  department_nodes: departments[] = [];
  id: string = '';
  selected_department_id: string = '';
  steps: Steps_Struct[] = [
    {
      index: 0,
      title: '注册账户',
      status:'process'
    },
    {
      index: 1,
      title: '填写资料',
      status:'wait'
    },
    {
      index: 2,
      title: '完成注册',
      status:'wait'
    },
  ];

  
  onChange($event: string): void {
    this.selected_department_id = $event;
    console.log(this.selected_department_id);
  }
  onIndexChange(event: number): void {
    this.index = event;
  }
  goHome(){
    this.router.navigate(['/Login']);
  }
  async ngOnInit(){
    (await this.registerService.load_department()).subscribe(res => {
      for(let item of res){
        if(item.parent_id == null){
          item.children = [];
          this.nodes.push({
            title: item.name,
            key: item.id,
            children: []
          })
        }
      }
      for(let item of res){
        for(let item1 of this.nodes){
          if(item.parent_id != null && item1.key == item.parent_id){
            item1.children.push({
              title: item.name,
              key: item.id,
              children: []
            })
          }
        }
      }
      console.log('this.department_nodes', this.department_nodes)
    })
    // 处理注册步骤，以便后面调用
    this.activitedRoute.queryParams.subscribe(params => {
      if(params['step'] != null && params['step'] == 1){
        console.log(params['step'])
        this.index = params['step'];
        if(this.index = 1){
          this.steps[0]['status'] = 'finish'
          this.id = params['id'];
        }
      }
    });
  }

  async reg_user(){
    const reg_form: RegisterForm = {
      ...this.registerForm.value,
      
    };
    (await this.registerService.reg_user(reg_form)).subscribe(res => {
      if('message' in res){
        this.notification.create(
          'error',
          '错误',
          res['message']
        );
        return;
      }
      this.notification.create(
        'success',
        '通知',
        '恭喜，账号注册成功，请填写后续资料进行员工登陆。'
      );
      this.id = res['id']
      this.steps[0]['status'] = 'finish'
      this.index = 1
    })
  }

  async reg_info(){
    const reg_form: RegisterForm = {
      ...this.registerForm.value,
      id: this.id,
      department_id: this.selected_department_id,
      role_id: 'ab5de7f9-bf3c-4fdf-8e07-2f506c39732a', // 员工
      is_leader: false
    };
    (await this.registerService.reg_info(reg_form)).subscribe(res => {
      if('message' in res){
        this.notification.create(
          'error',
          '错误',
          res['message']
        );
        return;
      }
      this.notification.create(
        'success',
        '通知',
        '恭喜，员工资料登记完成。'
      );
      this.steps[1]['status'] = 'finish'
      this.index = 2
    })
  }

  constructor(
    private router: Router,
    private activitedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private registerService: RegisterService
  ){}
}
