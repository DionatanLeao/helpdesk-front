import { Component } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
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
  selector: 'app-chamado-update',
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
  templateUrl: './chamado-update.component.html',
  styleUrl: './chamado-update.component.css'
})
export class ChamadoUpdateComponent {
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
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  
  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id')
    this.findById()
    this.findAllClientes()
    this.findAllTecnicos()
  } 

  findById(): void {
    this.chamadoService.findById(this.chamado.id).subscribe(response => {
      this.chamado = response
      this.priority.setValue(this.chamado.priority);
      this.status.setValue(this.chamado.status);
      this.title.setValue(this.chamado.title);
      this.observations.setValue(this.chamado.observations);
      this.technician.setValue(this.chamado.technician);
      this.client.setValue(this.chamado.client);
    }, ex => {
      this.toast.error(ex.error.error)
    })
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

  update(): void {
    this.chamado.priority = this.priority.value
    this.chamado.status = this.status.value
    this.chamado.title = this.title.value
    this.chamado.observations = this.observations.value
    this.chamado.technician = this.technician.value
    this.chamado.client = this.client.value

    this.chamadoService.update(this.chamado).subscribe(response => {
      this.toast.success('Chamado atualizado com sucesso', 'Update chamado')
      this.router.navigate(['chamados'])
    }, ex => {
      this.toast.error(ex.error.error)
    })
  }

  returnStatus(status: any): string {
    if(status == 0) {
      return 'ABERTO'
    } else if(status == 1) {
      return 'EM ANDAMENTO'
    } else {
      return 'ENCERRADO'
    }
  }

  returnPriority(priority: any): string {
    if(priority == 0) {
      return 'BAIXA'
    } else if(priority == 1) {
      return 'MÉDIA'
    } else {
      return 'ALTA'
    }
  }
  
  validaCampos(): boolean {
    return this.priority.valid && this.status.valid &&
    this.title.valid && this.observations.valid &&
    this.technician.valid && this.client.valid
  }
}
