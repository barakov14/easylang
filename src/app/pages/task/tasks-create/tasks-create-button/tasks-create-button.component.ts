import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tasks-create-button',
  standalone: true,
  imports: [],
  templateUrl: './tasks-create-button.component.html',
  styleUrl: './tasks-create-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksCreateButtonComponent {

}
