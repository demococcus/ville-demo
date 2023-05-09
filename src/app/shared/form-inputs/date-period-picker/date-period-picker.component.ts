import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms'
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';


@Component({
  selector: 'app-date-period-picker',
  templateUrl: './date-period-picker.component.html',
  styleUrls: ['./date-period-picker.component.css'],
  standalone: true,
	imports: [
		NgbDatepickerModule, 
		FormsModule, 
		JsonPipe, 
		ReactiveFormsModule, 
		NgxMaskDirective, 
		NgxMaskPipe,
		CommonModule
	],
})
export class DatePeriodPickerComponent {
  @Input() controlFrom: FormControl;
	@Input() controlTo: FormControl;
	@Input() labelFrom: string;
	@Input() labelTo: string;
	@Input() placeholder: string;
	@Input() mask: string;


	hoveredDate: NgbDate | null = null;

	fromDate: NgbDate | null;
	toDate: NgbDate | null;

	constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {}

	ngOnInit(): void {
    this.setCalendarValuestr(this.controlFrom.value, this.controlTo.value);
	}

  setCalendarValuestr(strFrom: string, strTo: string) {

    if (strFrom) {
      // set the calendar to this value             
      this.fromDate = new NgbDate(
        parseInt(strFrom.substring(0, 4)),
        parseInt(strFrom.substring(4, 6)),
        parseInt(strFrom.substring(6, 8))        
      );      
    };

    if (strTo) {
      // set the calendar to this value             
      this.toDate = new NgbDate(
        parseInt(strTo.substring(0, 4)),
        parseInt(strTo.substring(4, 6)),
        parseInt(strTo.substring(6, 8))        
      );      
    };
  }

	onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
			this.controlFrom.setValue(this.formatter.format(date).replace(/-/g, ""));

		} else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
			this.toDate = date;
			this.controlTo.setValue(this.formatter.format(this.toDate).replace(/-/g, ""));
		} else {
			this.toDate = null;
			this.fromDate = date;
			this.controlTo.setValue(this.formatter.format(this.toDate).replace(/-/g, ""));
			this.controlFrom.setValue(this.formatter.format(this.fromDate).replace(/-/g, ""));
		}

	}

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

	showErrorsFrom() {
		const {dirty, touched, errors } = this.controlFrom;
		return dirty && touched && errors
	
	  }

	  showErrorsTo() {
		const {dirty, touched, errors } = this.controlTo;
		return dirty && touched && errors
	
	  }

	// validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
	// 	const parsed = this.formatter.parse(input);
	// 	return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	// }
}