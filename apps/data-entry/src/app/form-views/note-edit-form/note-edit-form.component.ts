import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HeroService } from '@avengers-game-guide/shared/heroes/data-access';
import { Note } from '@avengers-game-guide/shared/notes/data-access';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'aggd-note-edit-form',
  templateUrl: './note-edit-form.component.html',
  styleUrls: ['./note-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'editForm'
})
export class NoteEditFormComponent implements OnInit, OnChanges {
  private _value: Note;
  @Input() set value(value: Note) { this._value = {...value} }
  get value() { return this._value }

  formValue: FormGroup
  value$: BehaviorSubject<Note>;

  constructor(public heroService: HeroService) { }

  ngOnInit(): void {
    this.setupForm()  }

  ngOnChanges(): void {
    this.updateForm(this._value);
  }

  setupForm() {
    this.formValue = new FormGroup({
      id: new FormControl({ value: this.value.id, disabled: true }),
      description: new FormControl(this.value.description),
      category: new FormControl(this.value.category),
      heroId: new FormControl(this.value.heroId),
    })

    this.value$ = new BehaviorSubject(this.formValue.value)
    this.formValue.valueChanges.subscribe(c => this.value$.next(c))
  }

  updateForm(value: Note) {
    if(this.formValue === undefined) { return }
    this.formValue.setValue(value)
    this._value = { ...this.value }
  }

  reset() {
    this.formValue.reset();
  }
}
