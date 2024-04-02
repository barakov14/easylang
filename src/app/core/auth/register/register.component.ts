import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'register',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInput,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {

}
