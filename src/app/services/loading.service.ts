import { Injectable } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';;

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public isLoading$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  setToLoad( value: boolean ) {

    this.isLoading$.next(value);

  }

}
