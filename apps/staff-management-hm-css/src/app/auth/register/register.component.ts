import { Component } from "@angular/core";
import { Router } from "@angular/router";

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
  nodes = [
    {
      title: 'parent 1',
      key: '100',
      children: [
        {
          title: 'parent 1-0',
          key: '1001',
          children: [
            { title: 'leaf 1-0-0', key: '10010', isLeaf: true },
            { title: 'leaf 1-0-1', key: '10011', isLeaf: true }
          ]
        },
        {
          title: 'parent 1-1',
          key: '1002',
          children: [{ title: 'leaf 1-1-0', key: '10020', isLeaf: true }]
        }
      ]
    }
  ]
  onChange($event: string): void {
    console.log($event);
  }
  onIndexChange(event: number): void {
    this.index = event;
  }
  goHome(){
    this.router.navigate(['/Home/welcome'])
  }

  constructor(
    private router: Router
  ){}
}
