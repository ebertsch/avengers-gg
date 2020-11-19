import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { DataAccessModule as PerksDataAccessModule } from '@avengers-game-guide/shared/perks/data-access';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { PerkSelectComponent } from './perk-select/perk-select.component';
import { SharedUiModule } from '@avengers-game-guide/shared/ui'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedUiModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatIconModule,
    PerksDataAccessModule,
  ],
  declarations: [PerkSelectComponent],
  exports: [PerkSelectComponent],
  providers: [ErrorStateMatcher],

})
export class SharedPerksPerkSelectModule {}
