import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { calculateTimeRemaining } from './date.helper'
import { Ng2FittextModule } from 'ng2-fittext'

import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    Ng2FittextModule,
  ],
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent {
  form!: FormGroup
  timeRemaining!: string
  private readonly STORAGE_KEY = 'counterFormData'
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      date: [null, [Validators.required]],
    })

    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      if (
        this.form.valid &&
        this.form.get('title')?.value &&
        this.form.get('date')?.value
      ) {
        this.updateTimeRemaining()
        this.setLocalStorage()
      }
    })
  }

  ngOnInit() {
    this.getLocalStorage()
  }

  setLocalStorage() {
    const formData = {
      title: this.form.get('title')?.value,
      date: this.form.get('date')?.value,
    }
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(formData))
  }

  getLocalStorage() {
    const savedData = localStorage.getItem(this.STORAGE_KEY)

    if (savedData) {
      const formData = JSON.parse(savedData)
      this.form.patchValue(formData)
    }
  }

  updateTimeRemaining() {
    this.timeRemaining = calculateTimeRemaining(this.form.get('date')?.value)
  }
}
