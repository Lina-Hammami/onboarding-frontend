import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent {
  @Output() deleteConfirmed = new EventEmitter();
  @Output() deleteCanceled = new EventEmitter();

  constructor() { }

  delete() {
    this.deleteConfirmed.emit();
  }

  cancel() {
    this.deleteCanceled.emit();
  }
}
