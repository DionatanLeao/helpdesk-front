import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Chamado } from '../../../models/chamado';
import { ChamadoService } from '../../../services/chamado.service';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-chamado-list',
  imports: [
    MatTableModule, 
    MatPaginatorModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    RouterModule,
    MatRadioModule
  ],
  templateUrl: './chamado-list.component.html',
  styleUrl: './chamado-list.component.css'
})
export class ChamadoListComponent {
  ELEMENT_DATA: Chamado[] = []
  FILTERED_DATA: Chamado[] = []
  displayedColumns: string[] = ['id', 'title', 'client', 'technician', 'openingDate', 'priority', 'status', 'acoes'];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator
  constructor(private chamadoService: ChamadoService) {}

  ngOnInit(): void {
    this.findAll()
  }

  findAll() {
    this.chamadoService.findAll().subscribe(response => {
      this.ELEMENT_DATA = response
      this.dataSource = new MatTableDataSource<Chamado>(response);
      this.dataSource.paginator = this.paginator
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  orderByStatus(status: any): void {
    let list: Chamado[] = []
    this.ELEMENT_DATA.forEach(element => {
      if(element.status == status)
        list.push(element)
    })
    this.FILTERED_DATA = list
    this.dataSource = new MatTableDataSource<Chamado>(list);
      this.dataSource.paginator = this.paginator
  }

}
