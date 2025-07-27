import { Component, OnInit } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatNavList } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MatSidenavModule, MatNavList, MatIconModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.router.url === '/') {
      this.router.navigate(['home']);
    }
  }
}
