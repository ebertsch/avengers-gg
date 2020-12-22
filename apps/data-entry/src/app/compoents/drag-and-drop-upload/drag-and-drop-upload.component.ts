import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy, HostListener, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

export type UploaderFunction = <T>(file: string | Blob, field?: string)=>Observable<T>

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

  previewImage: string = null

  // Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    this.isUploading = true
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.uploader<T>(files[0]).subscribe(results => {
        this.previewImage = URL.createObjectURL(files[0])
        this.uploaded.emit(results)
        this.isUploading = false
      })
    } else if (evt.dataTransfer.items.length > 0) {
      evt.dataTransfer.items[0].getAsString(itemUrl => {
        fetch(itemUrl).then(async r => {
          this.uploader<T>(await r.blob()).subscribe(results => {
            this.uploaded.emit(results)
            this.isUploading = false
          })
        })
      })
    }
  }

  @Input() uploader: UploaderFunction
  @Output() uploaded= new EventEmitter<T>()

  isUploading = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }



}
