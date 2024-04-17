import { ChangeDetectionStrategy, Component } from '@angular/core';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EditorConfig, NgxSimpleTextEditorModule, ST_BUTTONS} from "ngx-simple-text-editor";

@Component({
  selector: 'task-submission',
  standalone: true,
  imports: [
    NgxSimpleTextEditorModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './task-submission.component.html',
  styleUrl: './task-submission.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskSubmissionComponent {
  public formGroup = new FormBuilder().group({
    text: new FormControl('')
  })

  config: EditorConfig = {
    placeholder: 'Type something...',
    buttons: ST_BUTTONS,
  };
}
