import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PerkService } from '@avengers-game-guide/shared/perks/data-access';

@Component({
  selector: 'aggd-gear-detection-form',
  templateUrl: './gear-detection-form.component.html',
  styleUrls: ['./gear-detection-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GearDetectionFormComponent implements OnInit {

  constructor(public perkService: PerkService) { }

  ngOnInit(): void {
  }

  uploader(file) { return file }

  onUploaded(file) { 
    console.log('onuploaded', file)
  }

}
