import { Component, OnInit, ChangeDetectionStrategy, forwardRef, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HeroService } from '@avengers-game-guide/shared/heroes/data-access';
import { Guide } from '@avengers-game-guide/shared/guides/data-access';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'aggd-guide-edit-form',
  templateUrl: './guide-edit-form.component.html',
  styleUrls: ['./guide-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'editForm'
})
export class GuideEditFormComponent implements OnInit, OnChanges {
  private _value: Guide;
  @Input() set value(value: Guide) { this._value = {...value} }
  get value() { return this._value }

  formValue: FormGroup
  value$: BehaviorSubject<Guide>;

  constructor(public heroService: HeroService) { }

  ngOnInit(): void {
    this.setupForm()  }

  ngOnChanges(): void {
    this.updateForm(this._value);
  }

  setupForm() {
    this.formValue = new FormGroup({
      id: new FormControl(this.value.id),
      title: new FormControl(this.value.title),
      urlLink: new FormControl(this.value.urlLink),
      youtubeId: new FormControl(this.value.youtubeId),
      heroId: new FormControl(this.value.heroId),
    })

    this.value$ = new BehaviorSubject(this.formValue.value)
    this.formValue.valueChanges.subscribe(c => this.value$.next(c))
  }

  updateForm(value: Guide) {
    if(this.formValue === undefined) { return }
    this.formValue.setValue(value)
    this._value = { ...this.value }
  }

  reset() {
    this.formValue.reset();
  }
}
