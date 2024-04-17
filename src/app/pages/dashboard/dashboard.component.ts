import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {ProjectService} from "../project/project.service";
import {DestroyService} from "../../core/utils/destroy.service";
import {takeUntil} from "rxjs";
import {AsyncPipe, NgOptimizedImage} from "@angular/common";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [
    MatButton,
    AsyncPipe,
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardContent,
    MatDivider,
    MatCardActions,
    MatCardSubtitle,
    MatIconButton,
    MatIcon,
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  private readonly projectService = inject(ProjectService)
  private readonly destroy$ = inject(DestroyService)
  public projectsList$ = this.projectService.projectsList$.asObservable()

  ngOnInit() {
    this.projectService.getProjectsList().pipe(
      takeUntil(this.destroy$)
    ).subscribe()
  }
}
