import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core'
import {HeaderComponent} from '../../shared/ui/header/header.component'
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
  MatSidenav,
  MatSidenavContainer,
} from '@angular/material/sidenav'
import {RouterOutlet} from '@angular/router'
import {ProfileService} from '../profile/services/profile.service'
import {DestroyService} from '../../core/utils/destroy.service'
import {takeUntil} from 'rxjs'
import {NavbarComponent} from '../../shared/ui/navbar/navbar.component'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import {ProjectService} from '../project/project.service'
import {AsyncPipe} from '@angular/common'
import {RouteHierarchyComponent} from '../../shared/ui/route-hierarchy/route-hierarchy.component'

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    HeaderComponent,
    MatSidenavContainer,
    RouterOutlet,
    MatSidenav,
    NavbarComponent,
    MatDrawerContainer,
    MatDrawer,
    MatDrawerContent,
    AsyncPipe,
    RouteHierarchyComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private readonly profileService = inject(ProfileService)
  private readonly projectService = inject(ProjectService)
  public readonly projectsList$ =
    this.projectService.lastProjectsList$.asObservable()
  private readonly destroyRef = inject(DestroyRef)

  ngOnInit() {
    this.profileService
      .getUserInformation()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe()

    this.projectService
      .getLastProjects()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe()
  }
}
