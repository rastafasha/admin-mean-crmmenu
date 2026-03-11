import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-projectitem',
  templateUrl: './projectitem.component.html',
  styleUrls: ['./projectitem.component.css']
})
export class ProjectitemComponent implements OnInit {

  @Input() project: Project;
  @Input() showAdminControls: boolean = false;

  @Output() onTogglePresentation = new EventEmitter<string>();
  @Output() onEdit = new EventEmitter<string>();
  @Output() onDelete = new EventEmitter<Project>();
  @Output() onEditProject = new EventEmitter<Project>();
  @Output() selectedProject: Project;

 
  ngOnInit(): void {
  }

  togglePresentation() {
    this.onTogglePresentation.emit(this.project._id);
  }

  editProject() {
    this.onEdit.emit(this.project._id);
  }

  deleteProject() {
    this.onDelete.emit(this.project);

  }

  openEditModal(project: Project): void {
    this.onEditProject.emit(project);
  }

  openPaymentsModal(project: Project): void {
    this.selectedProject = project;
    // console.log(project);
  }
}
