import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FbService } from 'src/app/services/fb/fb.service';
import { UiService } from 'src/app/services/ui/ui.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private fb: FbService, public ui: UiService, public router: Router) {
  }

  ngOnInit() {
  }
}
