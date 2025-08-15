import { Component } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {FormControl, ReactiveFormsModule, FormsModule, Validators} from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { TecnicoService } from '../../../services/tecnico.service';
import { Tecnico } from '../../../models/tecnico';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
  tecnico: Tecnico = {
    id: '',
    name: '',
    cpf: '',
    email: '',
    password: '',
    perfis: [],
    dataCriacao: ''
  }

  name: FormControl = new FormControl(null, [Validators.required, Validators.minLength(3)]);
  cpf: FormControl = new FormControl(null, [Validators.required]);
  email: FormControl = new FormControl(null, [Validators.required, Validators.email]);
  password: FormControl = new FormControl(null, [Validators.required, Validators.minLength(3)]);

  constructor(
    private tecnicoService: TecnicoService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
  } 

  create(): void {
    this.tecnico.name = this.name.value;
    this.tecnico.cpf = this.cpf.value;
    this.tecnico.email = this.email.value;
    this.tecnico.password = this.password.value;

    this.tecnicoService.create(this.tecnico).subscribe(() => {
      this.toast.success('Técnico cadastrado com sucesso', 'Cadastro')
      this.router.navigate(['tecnicos'])
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message)
        });
      }
      this.toast.error(ex.error.message)     
    })
  }

  addPerfil(perfil: any): void {
    if(this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1)
    } else {
      this.tecnico.perfis.push(perfil)
    }
  }

  validaCampos(): boolean {
    console.log(this.name)
    console.log(this.cpf)
    console.log(this.email)
    console.log(this.password)
    return this.name.valid && this.cpf.valid && this.email.valid && this.password.valid
  }
}
