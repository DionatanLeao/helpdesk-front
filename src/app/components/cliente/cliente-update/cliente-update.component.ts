import { Component } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {FormControl, ReactiveFormsModule, FormsModule, Validators} from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-cliente-update',
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
  templateUrl: './cliente-update.component.html',
  styleUrl: './cliente-update.component.css'
})
export class ClienteUpdateComponent {
  cliente: Cliente = {
      id: '',
      name: '',
      cpf: '',
      email: '',
      password: '',
      profiles: [],
      creationDate: ''
  }

  name: FormControl = new FormControl(null, [Validators.required, Validators.minLength(3)]);
  cpf: FormControl = new FormControl(null, [Validators.required]);
  email: FormControl = new FormControl(null, [Validators.required, Validators.email]);
  password: FormControl = new FormControl(null, [Validators.required, Validators.minLength(3)]);

  constructor(
    private clienteService: ClienteService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id')
    this.findById()
  } 

  findById(): void {
    this.clienteService.findById(this.cliente.id).subscribe( response => {
      this.cliente = response
      this.name.setValue(this.cliente.name);
      this.cpf.setValue(this.cliente.cpf);
      this.email.setValue(this.cliente.email);
      this.password.setValue(this.cliente.password);
    })
  }

  update(): void {
    this.cliente.name = this.name.value;
    this.cliente.cpf = this.cpf.value;
    this.cliente.email = this.email.value;
    this.cliente.password = this.password.value;

    this.clienteService.update(this.cliente).subscribe(() => {
      this.toast.success('Cliente atualizado com sucesso', 'Update')
      this.router.navigate(['clientes'])
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
    if(this.cliente.profiles.includes(perfil)) {
      this.cliente.profiles.splice(this.cliente.profiles.indexOf(perfil), 1)
    } else {
      this.cliente.profiles.push(perfil)
    }
  }

  validaCampos(): boolean {
    return this.name.valid && this.cpf.valid && this.email.valid && this.password.valid
  }

}
