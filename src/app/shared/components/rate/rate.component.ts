import { ChangeDetectorRef, Component, inject, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface RateOptions {
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
export class RateComponent implements ControlValueAccessor, OnChanges {

  cdr = inject(ChangeDetectorRef);

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
    console.log('writeValue', value);
    this.rate = value;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }


  ngOnChanges(changes: SimpleChanges): void {
    const { options } = changes;

    if (options && options.currentValue) {
      this.rate = 0;
      this.fillStarts();
      this.cdr.detectChanges();
    }

  }

  private fillStarts(): void {
    this.stars = Array.from({ length: this.options.size }, (_, index) => ({ id: index + 1 }));

  }

  public rateHandler(index: number): void {
    if (this.rate <= this.options.size) {
      this.rate = index + 1;
      this.onChange(this.rate);
    }
  }

}
