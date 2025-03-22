import { Component, inject } from '@angular/core';
import { RateComponent, RateOptions } from '../../shared/components/rate/rate.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rate-form',
  imports: [RateComponent, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './rate-form.component.html',
  styleUrl: './rate-form.component.scss',
})
export class RateFormComponent {

  fb = inject(FormBuilder);

  sizeValue: number | null = null;
  textValue: string | null = null;

  public rateOptions: RateOptions = {
    size: 10,
    text: 'Rate this'
  }

  public form: FormGroup = this.fb.group({
    rate: [{ value: 0, disabled: false }]
  });


  public onSizeChange() {
    if (this.sizeValue! > 10) {
      this.sizeValue = 10;
    } else if (this.sizeValue! < 1) {
      this.sizeValue = 1;
    }
  }

  public onTextChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.replace(/[^a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s]/g, '').slice(0, 20);;
    this.textValue = inputElement.value;
  }


  public saveRateOptions(): void {
    this.rateOptions = {
      size: this.sizeValue || this.rateOptions.size,
      text: this.textValue || this.rateOptions.text
    };
    this.form.setValue({ rate: 0 });
    this.sizeValue = null;
    this.textValue = null;
  }
}
