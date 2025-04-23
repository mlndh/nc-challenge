import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing'

import { CountdownComponent } from './countdown.component'
import { FormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

describe('CountdownComponent', () => {
  let component: CountdownComponent
  let fixture: ComponentFixture<CountdownComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountdownComponent, FormsModule, NoopAnimationsModule],
    }).compileComponents()

    fixture = TestBed.createComponent(CountdownComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should mark form as valid when filled with data', () => {
    component.form.patchValue({
      title: 'Test Event',
      date: new Date(),
    })
    expect(component.form.valid).toBeTruthy()
  })

  it('should call updateTimeRemaining and setLocalStorage when form changes with valid data', fakeAsync(() => {
    spyOn(component, 'updateTimeRemaining')
    spyOn(component, 'setLocalStorage')

    component.form.patchValue({
      title: 'Test Event',
      date: new Date(),
    })

    tick()

    expect(component.updateTimeRemaining).toHaveBeenCalled()
    expect(component.setLocalStorage).toHaveBeenCalled()
  }))
})
