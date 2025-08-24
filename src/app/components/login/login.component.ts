import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, Validators} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { Credenciais } from '../../models/credenciais';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  creds: Credenciais = {
    email: '',
    password: ''
  }

  email = new FormControl(null, Validators.email)
  password = new FormControl(null, Validators.minLength(3))

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  logar() {
    this.creds.email = this.email.value;
    this.creds.password = this.password.value;

    this.authService.authenticate(this.creds).subscribe(response => {
    this.authService.successfullLogin(response.headers.get('Authorization').substring(7))
    this.router.navigate(['home'])
    }, () => {
      this.toastr.error('Usuário e/ou senha inválidos')
    })
  }

  validaCampos(): boolean {
    return this.email.value && this.password.value
  }

}
