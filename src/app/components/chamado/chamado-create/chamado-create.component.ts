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
  constructor() {}
  
  ngOnInit(): void {
  } 

  create(): void {

  }
  
  validaCampos(): boolean {
    return true
  }

}
