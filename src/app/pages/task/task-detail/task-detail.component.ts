import { ChangeDetectionStrategy, Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'task-detail',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDetailComponent {

}
