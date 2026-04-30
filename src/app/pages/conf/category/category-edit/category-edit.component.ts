import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Category } from 'src/app/models/category';
import { environment } from 'src/environments/environment';

import Swal from 'sweetalert2';
import { CategoryService } from 'src/app/services/category.service';
@Component({
    selector: 'app-category-edit',
    templateUrl: './category-edit.component.html',
    styleUrls: ['./category-edit.component.css'],
    standalone: false
})
export class CategoryEditComponent implements OnInit {

  @Input() displaycomponent: string = 'block';
  @Input() categories: Category;

  title: string;
  public categoryForm: FormGroup;
  public category: Category;
  public usuario: User;
  error: string;
  isLoading: boolean = false;

  idcategory: any;

  public msm_error = '';

  public categorySeleccionado: Category;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private categoriaService: CategoryService,
  ) {
    this.usuario = usuarioService.usuario;
    const base_url = environment.apiUrl;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.cargarCategory(id));
    this.validarFormulario();
    this.getCategories();
    window.scrollTo(0, 0);

    if (this.categorySeleccionado) {
      //actualizar
      this.title = 'Creando Categoría';

    } else {
      //crear
      this.title = 'Editar Categoría';
    }
  }

  validarFormulario() {
    this.categoryForm = this.fb.group({
      nombre: ['', Validators.required],
    })
  }

  cargarCategory(_id: string) {
    if (_id !== null && _id !== undefined) {
      this.title = 'Editando Categoría';
      this.categoriaService.getCategory(_id).subscribe(
        (res: any) => {
          this.categoryForm.patchValue({
            id: res._id,
            nombre: res.nombre,
          });
          this.categorySeleccionado = res;
        }
      );
    } else {
      this.title = 'Creando Categoría';
    }

  }

  updateCategory() {
    this.isLoading = true;
    const { nombre } = this.categoryForm.value;

    if (this.categorySeleccionado) {
      //actualizar
      const data = {
        ...this.categoryForm.value,
        _id: this.categorySeleccionado._id
      }
      this.categoriaService.updateCategory(data).subscribe(
        resp => {
          Swal.fire('Actualizado', `${nombre}  actualizado correctamente`, 'success');
          // this.router.navigateByUrl(`/dashboard/categories`);
          // console.log(this.categorySeleccionado);
          this.getCategories();
          this.isLoading = false;
        });

    } else {
      //crear
      this.categoriaService.createCategory(this.categoryForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
          // this.router.navigateByUrl(`/dashboard/categories`);
          // this.enviarNotificacion();
          this.getCategories();
          this.isLoading = false;
        })
    }

  }

  // enviarNotificacion(): void {
  //   this.alertService.success("Mensaje de Monedas","Se ha creado una nueva moneda!");
  // }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  getCategories(): void {
    this.categoriaService.getCategories().subscribe(
      (res: any) => {
        this.categories = res;
        error => this.error = error
      }
    );
  }

  eliminarCategory(_id: string) {
    Swal.fire({
      title: 'Estas Seguro?',
      text: "No podras recuperarlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.deleteCategory(_id).subscribe(
          response => {
            this.getCategories();
          }
        );
        Swal.fire(
          'Borrado!',
          'El Archivo fue borrado.',
          'success'
        )
        this.getCategories();
      }
    });

  }

}
