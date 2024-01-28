import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingTriggered$ =  new BehaviorSubject<boolean>(false); 

  public isLoading = this.loadingTriggered$.asObservable()

  /* emitimos el valor cuando cambia */
  setIsLoading(value: boolean) {
    this.loadingTriggered$.next(value);
  }


}
