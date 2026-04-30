import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Category } from 'src/app/models/category';

@Component({
    selector: 'app-projecttypeedit',
    templateUrl: './projecttypeedit.component.html',
    styleUrls: ['./projecttypeedit.component.css'],
    standalone: false
})
export class ProjecttypeeditComponent implements OnInit {

  @Input() categories: Category;
  displaycomponent: string = 'none';
  public categorySeleccionado: Category;
  error: string;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  handleSubmit(){}

  

}
