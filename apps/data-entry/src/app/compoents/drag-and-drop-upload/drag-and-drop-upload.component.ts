import { Component, OnInit, ChangeDetectionStrategy, HostListener, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'aggd-drag-and-drop-upload',
  templateUrl: './drag-and-drop-upload.component.html',
  styleUrls: ['./drag-and-drop-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DragAndDropUploadComponent<T> implements OnInit {
  @HostBinding('class.fileover') fileOver: boolean;

  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
  }

  // Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.uploader(files[0]).subscribe(results => {
        this.uploaded.emit(results)
      })
    }
  }

  @Input() uploader: (file: string | Blob, field?: string)=>Observable<T>
  @Output() uploaded= new EventEmitter<T>()

  constructor() { }

  ngOnInit(): void {
  }



}
