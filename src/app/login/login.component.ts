import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: any = {};
  wrongPassword = false;
  constructor(
    private router: Router
  ) { }

  ngOnInit() { }

  login() {
    if (this.model.password === 'abcd') {
      localStorage.setItem('authentication', JSON.stringify({value: true,
        expiry: new Date().getTime() + 1800000}));
      this.router.navigate(['/inputdirect']);
    } else {
      this.wrongPassword = true;
    }
  }

}
