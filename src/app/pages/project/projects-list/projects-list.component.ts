import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'projects-list',
  standalone: true,
  imports: [],
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsListComponent {

}
