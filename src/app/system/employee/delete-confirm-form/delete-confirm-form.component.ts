import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sd-delete-confirm-form',
  templateUrl: './delete-confirm-form.component.html',
  styleUrls: ['./delete-confirm-form.component.css']
})
export class DeleteConfirmFormComponent {

  @Input() name: string;
  @Input() delay: boolean;

  @Output() formIsConfirmed = new EventEmitter();

  deleteClickOn() {
    this.formIsConfirmed.emit(true);
  }

  cancelClickOn() {
    this.formIsConfirmed.emit(false);
  }
}
