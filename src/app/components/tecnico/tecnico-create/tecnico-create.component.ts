import { Component } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {FormControl, ReactiveFormsModule, FormsModule, Validators} from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-tecnico-create',
  imports: [
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective
  ],
  templateUrl: './tecnico-create.component.html',
  styleUrl: './tecnico-create.component.css'
})
export class TecnicoCreateComponent {
  name: FormControl = new FormControl(null, Validators.maxLength(3))
  cpf: FormControl = new FormControl(null, Validators.required)
  email: FormControl = new FormControl(null, Validators.email)
  password: FormControl = new FormControl(null, Validators.minLength(3))

  constructor() {}

  ngOnInit(): void {
  }

  validaCampos(): boolean {
    return this.name.valid && this.cpf.valid && this.email.valid && this.password.valid
  }

}
