import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface RateOptions {
  size: number;
  text: string;
}

@Component({
  selector: 'app-rate',
  imports: [],
  templateUrl: './rate.component.html',
  styleUrl: './rate.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RateComponent,
      multi: true,
    }
  ],
})
export class RateComponent implements ControlValueAccessor, OnInit {

  @Input() options!: RateOptions;

  public trackByIndex(index: number): number {
    return index;
  }

  public stars: any[] = [];
  public rate = 0;
  public disabled = false;
  public onChange: any = () => { };
  public onTouched: any = () => { };

  public writeValue(value: number): void {
    this.rate = value;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit() {
    console.log('RateComponent', this.options);
    this.fillStarts();
    console.log('RateComponent', this.stars);
  }

  private fillStarts(): void {
    this.stars = Array.from({ length: this.options.size }, (_, index) => ({ id: index + 1 }));

  }

  public rateHandler(index: number): void {
    if (this.rate <= this.options.size) {
      console.log('index', index);
      this.rate = index + 1;
      this.onChange(this.rate);
    }
  }

}
