import { Component } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {FormControl, ReactiveFormsModule, FormsModule, Validators} from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { TecnicoService } from '../../../services/tecnico.service';
import { Tecnico } from '../../../models/tecnico';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tecnico-update',
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
  templateUrl: './tecnico-update.component.html',
  styleUrl: './tecnico-update.component.css'
})
export class TecnicoUpdateComponent {
  tecnico: Tecnico = {
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

  update(): void {
    this.tecnico.name = this.name.value;
    this.tecnico.cpf = this.cpf.value;
    this.tecnico.email = this.email.value;
    this.tecnico.password = this.password.value;

    this.tecnicoService.update(this.tecnico).subscribe(() => {
      this.toast.success('Técnico atualizado com sucesso', 'Update')
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
    if(this.tecnico.profiles.includes(perfil)) {
      this.tecnico.profiles.splice(this.tecnico.profiles.indexOf(perfil), 1)
    } else {
      this.tecnico.profiles.push(perfil)
    }
  }

  validaCampos(): boolean {
    return this.name.valid && this.cpf.valid && this.email.valid && this.password.valid
  }

}
