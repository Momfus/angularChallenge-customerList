import { Component } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Customer List Challenge';

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private loadingService: LoadingService,
  ){
    this.isLoading$ = this.loadingService.isLoading$;
  }
}
