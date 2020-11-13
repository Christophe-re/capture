import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { runInThisContext } from 'vm';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  model: any = {};
  wrongPassword: boolean;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.wrongPassword = false;
  }

  login() {
    if (this.model.password && this.model.password.length) {
      this.authService.getLoggin(this.model.password.trim()).then(res => {
        if (res) {
          this.wrongPassword = false;
          this.router.navigate(['/scan']);
        } else {
          this.wrongPassword = true;
        }
      });
    }
  }
}
