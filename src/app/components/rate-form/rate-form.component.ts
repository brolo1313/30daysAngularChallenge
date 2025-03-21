import { Component } from '@angular/core';
import { RateComponent } from '../../shared/components/rate/rate.component';

@Component({
  selector: 'app-rate-form',
  imports: [RateComponent],
  templateUrl: './rate-form.component.html',
  styleUrl: './rate-form.component.scss'
})
export class RateFormComponent {

  public rateOptions = {
    size: 10,
    text: 'Rate this'
  }
}
