import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
// import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
// import { Router } from '@angular/router';
// import { AlertifyService } from '../services/alertify.service';
// import { User } from '../_models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      username: [''],
      password: [''],
      confirmPassword: ['']
    });
  }

  // passwordMatchValidator(g: FormGroup) {
  //   return g.get('password').value === g.get('confirmPassword').value ? null : {mismatch: true};
  // }

  register() {
    this.authService.register(this.model).subscribe(() => {
      console.log('registration successful');
      // this.alertify.success('Registration successful');
    }, error => {
      // this.alertify.error(error);
      console.log(error);
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }

}
