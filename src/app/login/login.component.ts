import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  model: any = {};
  wrongPassword = false;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  login() {
    if (this.model.password && this.model.password.length) {

      this.authService.getLoggin(this.model.password.trim()).then(res => {
        if (res) {
          console.log('here here')
          this.router.navigate(['/scan']);
        } else {
          this.wrongPassword = true;
        }
      });
 
    }
  }
}
