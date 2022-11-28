import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { first, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly restContryURL = 'https://restcountries.com/v3.1/all';
  private readonly baseURL =
    'https://api.openweathermap.org/data/2.5/weather?q=';
  private readonly forcastURL =
    'https://api.openweathermap.org/data/2.5/forecast?q=';
  private readonly appID = environment.appID_OWM;

  constructor(private http: HttpClient) {}

  getWeather(
    city: string,
    metric: 'metric' | 'imperial' = 'metric'
  ): Observable<any> {
    return this.http
      .get(`${this.baseURL}${city}&units=${metric}&APPID=${this.appID}`)
      .pipe(first());
  }

  getCapital(): Observable<any[]> {
    const a = this.http.get<any[]>(`${this.restContryURL}`).pipe(
      map((country) => {
        const b = country.map(capital => {
          return { ...capital.capital};
        });
        return b;
      })
    );

    return a;
  }

  /* getForecast(city: string, metric: 'metric' | 'imperial' = 'metric'): Observable<any> {
    return this.http.get(
      `${this.forcastURL}${city}&units=${metric}&APPID=${this.appID}`)
      .pipe(first(), map((weather) => weather['list']));
  } */
}
