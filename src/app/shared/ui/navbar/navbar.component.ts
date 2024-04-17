import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDrawer, MatSidenav} from "@angular/material/sidenav";
import {RouterLink} from "@angular/router";
import {MatMenuModule} from "@angular/material/menu";
import { MatListModule } from '@angular/material/list';
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle} from "@angular/material/expansion";
import {MatTree, MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule, MatTreeNode} from "@angular/material/tree";
import {FlatTreeControl} from "@angular/cdk/tree";
import {NgIf} from "@angular/common";

@Component({
  selector: 'ui-navbar',
  standalone: true,
  imports: [
    MatMenuModule,
    MatIcon,
    MatIconButton,
    MatButton,
    MatListModule,
    RouterLink,
    MatSlideToggle,
    MatLabel,
    FormsModule,
    MatTreeModule,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  @Input() start!: MatDrawer
  showDropdown: boolean = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}
