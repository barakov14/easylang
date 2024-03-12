import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tasks-create-dialog',
  standalone: true,
  imports: [],
  templateUrl: './tasks-create-dialog.component.html',
  styleUrl: './tasks-create-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksCreateDialogComponent {

}
