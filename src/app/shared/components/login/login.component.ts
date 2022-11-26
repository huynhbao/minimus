import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FbService } from 'src/app/services/fb/fb.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private fb: FbService, private router: Router) {
  }

  ngOnInit() {
  }

  login(e:any) {
    this.fb.signin(e.target.email.value, e.target.password.value).then(value => {
      this.router.navigateByUrl('');
    })
    .catch(err => {
      console.log('Something went wrong: ', err.message);
    });
  }
}
