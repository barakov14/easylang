import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {HeaderComponent} from "../../shared/ui/header/header.component";
import {MatSidenavContainer} from "@angular/material/sidenav";
import {RouterOutlet} from "@angular/router";
import {ProfileService} from "../profile/services/profile.service";
import {DestroyService} from "../../core/utils/destroy.service";
import {takeUntil} from "rxjs";

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    HeaderComponent,
    MatSidenavContainer,
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProfileService]
})
export class HomeComponent implements OnInit {

  private readonly profileService = inject(ProfileService)
  private readonly destroy$ = inject(DestroyService)

  ngOnInit() {
    this.profileService.getUserInformation().pipe(
      takeUntil(this.destroy$)
    ).subscribe()
  }
}
