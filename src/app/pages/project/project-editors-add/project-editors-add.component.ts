import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {User} from "../../../core/api-types/user";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  selector: 'project-editors-add',
  standalone: true,
  styleUrl: './project-editors-add.component.scss',
  templateUrl: './project-editors-add.component.html'
})
export class ProjectEditorsAddComponent {
  @Input({required: true}) editors!: User[]
  myControl = new FormControl('');
}
