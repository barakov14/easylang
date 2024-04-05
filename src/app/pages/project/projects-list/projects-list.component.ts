import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {ProjectService} from "../project.service";
import {DestroyService} from "../../../core/utils/destroy.service";
import {takeUntil} from "rxjs";
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ProjectCreateButtonComponent} from "../project-create/project-create-button/project-create-button.component";
@Component({
  selector: 'projects-list',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    NgIf,
    RouterLink,
    ProjectCreateButtonComponent,
    DatePipe
  ],
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsListComponent implements OnInit {

  private readonly projectService = inject(ProjectService)
  private readonly destroy$ = inject(DestroyService)
  public projectsList$ = this.projectService.projectsList$.asObservable()

  ngOnInit() {
    this.projectService.getProjectsList().pipe(
      takeUntil(this.destroy$)
    ).subscribe()
  }
}
