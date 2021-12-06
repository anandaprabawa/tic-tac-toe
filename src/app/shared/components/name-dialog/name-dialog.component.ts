import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-name-dialog',
  templateUrl: './name-dialog.component.html',
  styleUrls: ['./name-dialog.component.scss'],
})
export class NameDialogComponent {
  readonly form = this.formBuilder.group({
    name: ['', Validators.required],
  });

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<NameDialogComponent>
  ) {}

  getNameErrorMessage(): string {
    if (this.nameControl.hasError('required')) {
      return 'You must enter a name';
    }
    return '';
  }

  onSave(event: Event) {
    event.preventDefault();
    if (this.form.invalid) return;
    this.dialogRef.close(this.nameControl.value);
  }
}
