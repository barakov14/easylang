import {AfterViewInit, ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatPaginator} from "@angular/material/paginator";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'tasks-list',
  standalone: true,
    imports: [
        DatePipe,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatFormField,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatInput,
        MatLabel,
        MatPaginator,
        MatRow,
        MatRowDef,
        MatTable,
        MatHeaderCellDef,
        RouterLink,
        AsyncPipe,
        NgForOf,
        NgIf
    ],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksListComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'responsible', 'status', 'startedAt', 'endAt', 'success', 'progress', 'level'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
export interface PeriodicElement {
  id: number;
  name: string;
  status: string;
  startedAt: Date;
  progress: string
}


export interface Task {
  id: number;
  name: string;
  responsible: string;
  status: string;
  startedAt: string;
  endAt: string;
  successInPercent: number;
  progressInPercent: number;
  level: string;
}

const ELEMENT_DATA: Task[] = [
  {id: 1, name: 'Task 1', responsible: 'Alice', status: 'Pending', startedAt: '2022-01-01', endAt: '2022-01-15', successInPercent: 80, progressInPercent: 50, level: 'High'},
  {id: 2, name: 'Task 2', responsible: 'Bob', status: 'In Progress', startedAt: '2022-01-05', endAt: '2022-02-10', successInPercent: 60, progressInPercent: 70, level: 'Medium'},
  {id: 3, name: 'Task 3', responsible: 'Charlie', status: 'Completed', startedAt: '2022-02-01', endAt: '2022-02-28', successInPercent: 100, progressInPercent: 100, level: 'Low'},
  {id: 4, name: 'Task 4', responsible: 'David', status: 'On Hold', startedAt: '2022-03-10', endAt: '2022-04-20', successInPercent: 40, progressInPercent: 30, level: 'High'},
  {id: 5, name: 'Task 5', responsible: 'Eve', status: 'Pending', startedAt: '2022-04-05', endAt: '2022-05-15', successInPercent: 70, progressInPercent: 60, level: 'Medium'}
];
