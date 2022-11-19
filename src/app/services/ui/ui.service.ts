import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  
  darkModeState: BehaviorSubject<boolean>;

  constructor() {
    this.darkModeState = new BehaviorSubject<boolean>(false);
  }
}
