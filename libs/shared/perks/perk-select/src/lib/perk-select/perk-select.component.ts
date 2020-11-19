
import { ChangeDetectionStrategy, Component, Inject, Input, OnInit, Optional, Self, ElementRef, HostBinding, OnChanges, SimpleChange, SimpleChanges, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FormControl, NgControl } from '@angular/forms';
import { MatFormFieldControl, MatFormField, MAT_FORM_FIELD } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete'
import { Subject, Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { Perk, PerkService } from '@avengers-game-guide/shared/perks/data-access';
import { Hero } from '@avengers-game-guide/shared/heroes/data-access';
import { GearSlot, PerkSlot } from '@avengers-game-guide/shared/data';
import { FocusMonitor } from '@angular/cdk/a11y';
import { append, contains, either, intersection, isEmpty, isNil, mergeRight, prop, without } from 'ramda';
import { debounceTime, filter, map, tap, withLatestFrom } from 'rxjs/operators';

interface PerkSelectFilter {
  heroId: string[]
  allowAny: boolean
  gearSlot: GearSlot
  perkSlot: PerkSlot
  search: string
}

@Component({
  selector: 'agg-perk-select',
  templateUrl: './perk-select.component.html',
  styleUrls: ['./perk-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MatFormFieldControl, useExisting: PerkSelectComponent }],
})
export class PerkSelectComponent implements OnInit, OnChanges {
  @ViewChild(MatAutocompleteTrigger) trigger: MatAutocompleteTrigger;

  searchField: FormControl = new FormControl()

  @Input() hero: Hero;
  @Input() gearSlot: GearSlot;
  @Input() perkSlot: PerkSlot;
  @Input() allowAny = false;
  @HostBinding('class.allow-multiple') @Input() allowMultiple = false;
  @HostBinding('class.has-value') get hasValue() {
    const isRealValue = either(isEmpty, isNil);

    return !isRealValue(this.value)
  }
  perks$: Observable<Perk[]>

  //#region NgFormControl implementation
  static nextId = 0;

  static ngAcceptInputType_disabled: boolean | string | null | undefined;
  static ngAcceptInputType_required: boolean | string | null | undefined;

  stateChanges = new Subject<void>();
  focused = false;
  errorState = false;
  controlType = 'agg-perk-selector';
  id = `agg-perk-selector-${PerkSelectComponent.nextId++}`;
  onChange = (_: any) => { };
  onTouched = () => { };

  get empty() {

    return !this._value && !(this._value || []).length;
  }

  get shouldLabelFloat() { return this.focused || !this.empty; }

  @Input('aria-describedby') userAriaDescribedBy: string;

  @Input()
  get placeholder(): string { return this._placeholder; }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder: string;

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _disabled = false;
  //#endregion

  @Input()
  get value(): string | string[] | null {
    if (this.allowMultiple) {
      return this._value || []
    }
    return this._value
  }
  set value(newValue: string | string[] | null) {
    if (this._value !== newValue) {
      this._value = newValue;
      this.stateChanges.next();
    }
  }
  private _value: string | string[] | null

  get valueArray() {
    return (this._value as string[]) || []
  }

  get inputStyle() {
    let style = {}
    if (!this.allowMultiple && this.value) {
      style = mergeRight(style, { display: 'none' })
    }

    return style
  }

  selectFilter = new BehaviorSubject<PerkSelectFilter>({
    heroId: ['*'],
    perkSlot: null,
    gearSlot: null,
    allowAny: false,
    search: null
  })


  constructor(
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl,
    public perkService: PerkService) {

    _focusMonitor.monitor(_elementRef, true).subscribe(origin => {
      if (this.focused && !origin) {
        this.onTouched();
      }
      this.focused = !!origin;
      this.stateChanges.next();
    });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    this.searchField.setValue('')

    const filter$ = combineLatest([this.searchField.valueChanges, this.selectFilter]).pipe(
      map(([_search, _filter]) => ({ ..._filter, search: _search } as PerkSelectFilter)),
      debounceTime(50)
    )

    // tslint:disable-next-line: deprecation
    this.perks$ = combineLatest([this.perkService.entities$, filter$]).pipe(
      map(([perks, filter]) => {
        const items = perks.filter(p => intersection([filter.heroId, '*'], p.heroes).length)
        return items.filter(p => p.title.toLowerCase().indexOf(filter.search) > -1 || p.description.toLowerCase().indexOf(filter.search) > -1 )
      }),
      withLatestFrom(this.selectFilter),
      map(([perks, filter]) => {
        if (filter.allowAny) return perks;
        return perks.filter(p => contains(this.gearSlot, p.gear))
      }),
      withLatestFrom(this.selectFilter),
      map(([perks, filter]) => {
        if (filter.allowAny) return perks;

        const filterProperty = `slot${this.perkSlot}Enabled` as keyof Perk;
        return perks.filter(prop(filterProperty) as (any) => boolean)
      }),
    );
  }

  ngOnChanges(change: SimpleChanges) {
    this.selectFilter.next({
      heroId: ['*', this.hero.id],
      perkSlot: this.perkSlot,
      gearSlot: this.gearSlot,
      allowAny: this.allowAny,
      search: null
    } as PerkSelectFilter)
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  //#region MatFormControl implementation
  setDescribedByIds(ids: string[]) {
    if (ids.length) {
      this._elementRef.nativeElement.setAttribute('aria-describedby', ids.join(' '));
    } else {
      this._elementRef.nativeElement.removeAttribute('aria-describedby');
    }
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this._elementRef.nativeElement.querySelector('input')!.focus();
      this.onFocus()
    }
  }

  writeValue(newValue: string | string[] | null): void {
    this.value = newValue;
    this.onChange(this.value)
    this.searchField.setValue('')
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if(this.disabled) this.searchField.disable()
    else this.searchField.enable()
  }

  _handleInput(): void {
    this.onChange(this.value);
  }
  //#endregion


  onFocus() {
    this.trigger.openPanel();
  }

  perkSelected(event: MatAutocompleteSelectedEvent, source: MatInput) {
    const perk: Perk = event.option.value
    source.value = null

    if (!this.allowMultiple) this.writeValue(perk.id)

    if (!contains(perk.id, this.valueArray)) {
      this.writeValue(append(perk.id, this.valueArray))
    }
  }
  clearValue(id) {
    if (this.allowMultiple) {
      const newValue = without([id], this.valueArray);
      this.writeValue(newValue)
    } else {
      this.writeValue('')
    }

  }

}
