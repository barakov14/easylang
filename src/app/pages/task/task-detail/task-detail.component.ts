import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'task-detail',
  standalone: true,
  imports: [],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDetailComponent {

}
