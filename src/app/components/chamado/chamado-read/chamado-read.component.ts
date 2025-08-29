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
import { Chamado } from '../../../models/chamado';
import { ChamadoService } from '../../../services/chamado.service';

@Component({
  selector: 'app-chamado-read',
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
  templateUrl: './chamado-read.component.html',
  styleUrl: './chamado-read.component.css'
})
export class ChamadoReadComponent {
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

  priority: FormControl = new FormControl<string>({ value: '', disabled: true });
  status: FormControl = new FormControl<string>({ value: '', disabled: true });
  title: FormControl = new FormControl<string>({ value: '', disabled: true });
  observations: FormControl = new FormControl<string>({ value: '', disabled: true });
  technician: FormControl = new FormControl<string>({ value: '', disabled: true });
  client: FormControl =new FormControl<string>({ value: '', disabled: true });

  constructor(
    private chamadoService: ChamadoService,
    private toast: ToastrService,
    private route: ActivatedRoute,
  ) {}
  
  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id')
    this.findById()
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

}
