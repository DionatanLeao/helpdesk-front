import { Component, OnInit } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatNavList } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-nav',
  imports: [MatSidenavModule, MatNavList, MatIconModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
  }
}
