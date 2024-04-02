import {AfterViewInit, ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {DatePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";

@Component({
  selector: 'projects-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    DatePipe,
    RouterLink,
    MatInput,
    MatFormField,
    MatLabel
  ],
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsListComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'status', 'startedAt', 'progress'];
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

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, name: 'Project 1', status: 'Active', startedAt: new Date(), progress: '50%' },
  { id: 2, name: 'Project 2', status: 'Inactive', startedAt: new Date(), progress: '30%' },
  { id: 3, name: 'Project 3', status: 'Active', startedAt: new Date(), progress: '80%' },
  { id: 4, name: 'Project 4', status: 'Active', startedAt: new Date(), progress: '60%' },
  { id: 5, name: 'Project 5', status: 'Inactive', startedAt: new Date(), progress: '40%' },
  { id: 6, name: 'Project 6', status: 'Active', startedAt: new Date(), progress: '70%' },
  { id: 7, name: 'Project 7', status: 'Inactive', startedAt: new Date(), progress: '20%' },
  { id: 8, name: 'Project 8', status: 'Active', startedAt: new Date(), progress: '90%' },
  { id: 9, name: 'Project 9', status: 'Inactive', startedAt: new Date(), progress: '10%' },
  { id: 10, name: 'Project 10', status: 'Active', startedAt: new Date(), progress: '55%' }
];
