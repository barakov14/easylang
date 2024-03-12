import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tasks-list',
  standalone: true,
  imports: [],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksListComponent {

}
