import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard{
  constructor(
    private $route: Router
  ){}
  canActivate(): boolean {
    const token = localStorage.getItem('access_token');
    if(token){
      return true;
    }
    this.$route.navigate(['/Login']);
    return false;
  }
}
