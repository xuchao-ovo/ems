import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EmployeeService } from "../service/employee.service";
import { ICreateEmployee, IEmployee } from "../interface/employee.interface";
import { firstValueFrom } from "rxjs";
import { NzNotificationService } from "ng-zorro-antd/notification";
import {
  departments,
  node_department,
} from "../../../auth/register/register.interface";
import { RegisterService } from "../../../auth/register/register.service";
import Chart from "chart.js/auto";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"],
})
export class EmployeeListComponent {
  listOfData: IEmployee[] = [];
  editCache: { [key: string]: { edit: boolean; data: IEmployee } } = {};
  validateForm!: FormGroup;
  validateAddUserForm!: FormGroup;
  department_nodes: departments[] = [];
  isVisible = false;
  expandKeys = ["100", "1001"];
  value?: string;
  selected_department_id: string = "";
  nodes: node_department[] = [];
  displayChart: boolean = true;
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private notification: NzNotificationService,
    private registerService: RegisterService
  ) {}
  formatterAge = (value: number): string => `${value} 岁`;
  parserAge = (value: string): string => value.replace("岁 ", "");
  openModal() {
    this.isVisible = true;
  }

  async search() {
    const searchParams = this.validateForm.value; // 获取表单中的搜索条件
    const filteredData = this.listOfData.filter((item) => {
      return (
        item.name.includes(searchParams.name) &&
        item.position === searchParams.position &&
        item.age >= searchParams.less[0] &&
        item.age <= searchParams.less[1] &&
        item.is_leader === searchParams.more
      );
    });
    this.listOfData = filteredData; // 更新数据源显示过滤后的数据
    this.listOfData = await firstValueFrom(
      this.employeeService.get_employee_by_search(searchParams)
    );
    this.updateEditCache();
  }

  display() {
    const ageData = this.listOfData.map((data) => data.age); // 获取员工年龄数据

    const ageCounts: { [key: number]: number } = {};
    ageData.forEach((age) => {
      ageCounts[age] = (ageCounts[age] || 0) + 1;
    });

    const labels = Object.keys(ageCounts);
    const data = Object.values(ageCounts);

    const ctx = document.getElementById("agePieChart") as HTMLCanvasElement;
    const agePieChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
    this.displayChart = true;
  }
  closeChart(): void {
    this.displayChart = false;
  }

  handleOk() {
    if (this.validateAddUserForm.valid) {
      console.log("submit", this.validateAddUserForm.value);
      const user: ICreateEmployee = this.validateAddUserForm.value;
      this.employeeService.post_employee(user).subscribe((res) => {
        this.refresh_data();
      });
    } else {
      Object.values(this.validateAddUserForm.controls).forEach((control) => {
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
      name: ["", []],
      month: ["", []],
      position: ["", []],
      less: ["", []],
      more: ["", []],
      age: ["18", []],
    });
    this.validateAddUserForm = this.fb.group({
      username: ["", []],
      password: ["", []],
      name: ["", []],
      gender: ["M", []],
      age: ["18", []],
      is_leader: [false, []],
      department_id: ["", []],
      position: ["", []],
    });
    (await this.registerService.load_department()).subscribe((res) => {
      for (let item of res) {
        if (item.parent_id == null) {
          item.children = [];
          this.nodes.push({
            title: item.name,
            key: item.id,
            children: [],
          });
        }
      }
      for (let item of res) {
        for (let item1 of this.nodes) {
          if (item.parent_id != null && item1.key == item.parent_id) {
            item1.children.push({
              title: item.name,
              key: item.id,
              children: [],
            });
          }
        }
      }
      console.log("this.department_nodes", this.department_nodes);
    });
    this.listOfData = await firstValueFrom(this.employeeService.get_employee());
    this.updateEditCache();
  }
  onChange($event: string): void {
    this.selected_department_id = $event;
    console.log(this.selected_department_id);
  }

  deleteItem(id: string) {
    this.employeeService.delete_employee(id).subscribe((res) => {
      // 刷新列表数据
      this.refresh_data();
    });
  }
  handleCancel(): void {
    console.log("Button cancel clicked!");
    this.isVisible = false;
  }
  refresh_data() {
    this.employeeService.get_employee().subscribe((res) => {
      this.listOfData = res;
      this.updateEditCache();
      this.notification.create("success", "通知", "操作成功。");
    });
  }
  submitForm(): void {
    if (this.validateForm.valid) {
      console.log("submit", this.validateForm.value);
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
      .get("note")!
      .setValue(value === "male" ? "Hi, man!" : "Hi, lady!");
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
    this.employeeService
      .patch_employee(id, this.editCache[id].data)
      .subscribe((res) => {
        // 刷新列表
        this.refresh_data();
      });
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
