import { Component, Input } from '@angular/core';
import { Bean } from '../../core/bean.model';

@Component({
  selector: 'app-bean-detail',
  standalone: false,
  templateUrl: './bean-detail.component.html',
})
export class BeanDetailComponent {
  @Input() bean: Bean | null = null;
}
