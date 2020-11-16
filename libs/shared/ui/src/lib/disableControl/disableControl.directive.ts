import { Directive, Input } from '@angular/core';
import { FormControlName, FormControl, FormGroup, ControlContainer } from '@angular/forms';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[disableControl]'
})
export class DisableControlDirective {

  @Input() set disableControl(condition: boolean) {
    if (!this.formControlName) return
    const form: FormGroup = this.formControlName.formDirective.form;
    const control: FormControl = form.get(this.formControlName.path.join('.')) as FormControl;
    
    const action = condition ? 'disable' : 'enable';
    switch (action) {
      case 'disable':
        control.disable()
        break;
      case 'enable':
        control.enable()
        break;
    }
  }

  constructor(private formControlName: FormControlName) {
  }

}