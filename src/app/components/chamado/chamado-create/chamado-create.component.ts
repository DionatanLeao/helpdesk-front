import { Component } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {FormControl, ReactiveFormsModule, FormsModule, Validators} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Chamado } from '../../../models/chamado';

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
    MatSelectModule
  ],
  templateUrl: './chamado-create.component.html',
  styleUrl: './chamado-create.component.css'
})
export class ChamadoCreateComponent {
  chamado: Chamado = {
    id: '',
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

  priority: FormControl = new FormControl(null, [Validators.required]);
  status: FormControl = new FormControl(null, [Validators.required]);
  title: FormControl = new FormControl(null, [Validators.required]);
  observations: FormControl = new FormControl(null, [Validators.required]);
  technician: FormControl = new FormControl(null, [Validators.required]);
  client: FormControl = new FormControl(null, [Validators.required]);

  constructor() {}
  
  ngOnInit(): void {
  } 

  create(): void {

  }
  
  validaCampos(): boolean {
    return this.priority.valid && this.status.valid &&
    this.title.valid && this.observations.valid &&
    this.technician.valid && this.client.valid
  }

}
