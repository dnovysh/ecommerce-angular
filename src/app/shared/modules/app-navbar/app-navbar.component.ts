import { Component } from '@angular/core';
import { Router } from "@angular/router";

// noinspection JSIgnoredPromiseFromCall
@Component({
  selector: 'ec-app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss']
})
export class AppNavbarComponent {
  searchText: string | null

  constructor(private router: Router) { }

  onSearchEnter(): void {
    if (this.searchText) {
      this.router.navigate(['products/search'], { queryParams: { name: this.searchText } })
    }
  }
}
