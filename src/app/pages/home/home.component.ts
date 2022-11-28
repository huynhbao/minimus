import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/app/models/city.model';
import { FbService } from 'src/app/services/fb/fb.service';
import { UiService } from 'src/app/services/ui/ui.service';
import { WeatherService } from 'src/app/services/weather/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  cities:any = [];

  constructor(private fb: FbService, private weatherService: WeatherService, public ui: UiService, public router: Router) {
  }

  ngOnInit() {
    this.fb.getCities().subscribe((value:City[]) => {
      console.log(value);
    });

    this.weatherService.getCapital().subscribe((value:any[]) => {
      console.log(value.sort());
    });
  }
}
