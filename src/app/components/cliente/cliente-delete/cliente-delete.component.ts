import { Component } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {FormControl, ReactiveFormsModule, FormsModule, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-cliente-delete',
    imports: [
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cliente-delete.component.html',
  styleUrl: './cliente-delete.component.css'
})
export class ClienteDeleteComponent {
  cliente: Cliente = {
      id: '',
      name: '',
      cpf: '',
      email: '',
      password: '',
      profiles: [],
      creationDate: ''
  }

  name: FormControl = new FormControl<string>({ value: '', disabled: true });
  cpf: FormControl = new FormControl<string>({ value: '', disabled: true });
  email: FormControl = new FormControl<string>({ value: '', disabled: true });
  password: FormControl = new FormControl<string>({ value: '', disabled: true });

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

  delete(): void {
    this.clienteService.delete(this.cliente.id).subscribe(() => {
      this.toast.success('Cliente deletado com sucesso', 'Delete')
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

}
