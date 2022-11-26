import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FbService } from './services/fb/fb.service';
import { UiService } from './services/ui/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Minimus';

  showMenu: boolean = false;
  darkModeActive: boolean = false;

  loggedIn = this.fb.isAuth;

  constructor(
    public ui: UiService,
    public router: Router,
    private fb: FbService
  ) {}

  ngOnInit() {
    this.ui.darkModeState.subscribe((value) => {
      this.darkModeActive = value;
    });
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  logout() {
    this.toggleMenu();
    this.fb.signOut().then((value) => {
      this.router.navigateByUrl('/login');
    });
  }

  modeToggleSwitch() {
    this.ui.darkModeState.next(!this.darkModeActive);
  }
}
