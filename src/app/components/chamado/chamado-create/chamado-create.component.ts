import { Component } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FormControl, ReactiveFormsModule, FormsModule, Validators} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Chamado } from '../../../models/chamado';
import { Cliente } from '../../../models/cliente';
import { Tecnico } from '../../../models/tecnico';
import { ClienteService } from '../../../services/cliente.service';
import { TecnicoService } from '../../../services/tecnico.service';
import { ChamadoService } from '../../../services/chamado.service';

@Component({
  selector: 'app-chamado-create',
  imports: [
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule
],
  templateUrl: './chamado-create.component.html',
  styleUrl: './chamado-create.component.css'
})
export class ChamadoCreateComponent {

  chamado: Chamado = {
    openingDate: '',
    closingDate: '',
    priority: '',
    status: '',
    title: '',
    observations: '',
    technician: '',
    client: '',
    clientName: '',
    technicianName: '',
  }

  clientes: Cliente[] = []
  tecnicos: Tecnico[] = []

  priority: FormControl = new FormControl(null, [Validators.required]);
  status: FormControl = new FormControl(null, [Validators.required]);
  title: FormControl = new FormControl(null, [Validators.required]);
  observations: FormControl = new FormControl(null, [Validators.required]);
  technician: FormControl = new FormControl(null, [Validators.required]);
  client: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private toast: ToastrService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.findAllClientes()
    this.findAllTecnicos()
  } 

  findAllClientes(): void {
    this.clienteService.findAll().subscribe(response => {
      this.clientes = response
    })
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe(response => {
      this.tecnicos = response
    })
  }

  create(): void {
    this.chamado.priority = this.priority.value
    this.chamado.status = this.status.value
    this.chamado.title = this.title.value
    this.chamado.observations = this.observations.value
    this.chamado.technician = this.technician.value
    this.chamado.client = this.client.value

    this.chamadoService.create(this.chamado).subscribe(response => {
      this.toast.success('Chamado criado com sucesso', 'Novo chamado')
      this.router.navigate(['chamados'])
    }, ex => {
      this.toast.error(ex.error.error)
    })
  }
  
  validaCampos(): boolean {
    return this.priority.valid && this.status.valid &&
    this.title.valid && this.observations.valid &&
    this.technician.valid && this.client.valid
  }

}
