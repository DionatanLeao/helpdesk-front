import { Component } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {FormControl, ReactiveFormsModule, FormsModule, Validators} from '@angular/forms';
import { TecnicoService } from '../../../services/tecnico.service';
import { Tecnico } from '../../../models/tecnico';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tecnico-delete',
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
  templateUrl: './tecnico-delete.component.html',
  styleUrl: './tecnico-delete.component.css'
})
export class TecnicoDeleteComponent {
  tecnico: Tecnico = {
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
    private tecnicoService: TecnicoService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id')
    this.findById()
  } 

  findById(): void {
    this.tecnicoService.findById(this.tecnico.id).subscribe( response => {
      this.tecnico = response
      this.name.setValue(this.tecnico.name);
      this.cpf.setValue(this.tecnico.cpf);
      this.email.setValue(this.tecnico.email);
      this.password.setValue(this.tecnico.password);
    })
  }

  delete(): void {
    this.tecnicoService.delete(this.tecnico.id).subscribe(() => {
      this.toast.success('Técnico deletado com sucesso', 'Delete')
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

}
