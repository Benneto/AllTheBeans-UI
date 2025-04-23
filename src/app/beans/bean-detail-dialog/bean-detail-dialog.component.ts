import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Bean } from '../../core/bean.model';

@Component({
  selector: 'app-bean-detail-dialog',
  templateUrl: './bean-detail-dialog.component.html',
  standalone: false
})
export class BeanDetailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<BeanDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public bean: Bean
  ) { }

  close(): void {
    this.dialogRef.close();
  }
}
