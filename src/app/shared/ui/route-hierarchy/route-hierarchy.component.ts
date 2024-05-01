import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core'
import {
  ActivatedRoute,
  NavigationEnd,
  Route,
  Router,
  RouterLink,
} from '@angular/router'
import {NgForOf, NgIf} from '@angular/common'
import {filter, map} from 'rxjs'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'

@Component({
  selector: 'route-hierarchy',
  standalone: true,
  imports: [NgForOf, NgIf, RouterLink],
  templateUrl: './route-hierarchy.component.html',
  styleUrl: './route-hierarchy.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteHierarchyComponent implements OnInit {
  routeHierarchy!: string[]

  route!: string

  currentSegmentIndex = 0

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((route) => {
        this.routeHierarchy = this.buildRouteHierarchy(route)
      })
  }

  buildRouteHierarchy(initialRoute: ActivatedRoute) {
    const routeHierarchy = []
    let route: ActivatedRoute | null = initialRoute
    while (route) {
      const routeSnapshot = route.snapshot
      const routePath = routeSnapshot.url
        .map((segment) => segment.path)
        .join('/')
      if (routePath) {
        routeHierarchy.push(routePath)
      }
      route = route.firstChild
    }
    return routeHierarchy
  }

  getLink(index: number): string[] {
    return ['/', ...this.routeHierarchy.slice(0, index + 1)]
  }
}
