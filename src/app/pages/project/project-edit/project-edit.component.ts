import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { Category } from 'src/app/models/category';
import { Pais } from 'src/app/models/pais.model';
import { Project, ProjectType } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { CategoryService } from 'src/app/services/category.service';
import { PaisService } from 'src/app/services/pais.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css'],
})
export class ProjectEditComponent implements OnInit, OnChanges {
  @Input() projectSeleccionado;
  @Output() refreshProjectList: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  projectForm: FormGroup;
  title: string;
  usuario: User;
  partners: User[];
  project: Project;
  id: string;
  categorias: Category;
  paises: Pais;
  public imagenSubir!: File;
  public imgTemp: any = null;
  public FILE_AVATAR: any;
  public IMAGE_PREVISUALIZA: any = 'assets/img/user-06.jpg';

  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UserService,
    private projectService: ProjectService,
    private paisService: PaisService,
    private categoryService: CategoryService,
  ) {
    this.usuario = usuarioService.usuario;
    const base_url = environment.apiUrl;
  }

  ngOnInit(): void {
    this.validarFormulario();
    this.getCategorias();
    this.getPartners();
    this.getPaises();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['projectSeleccionado'] &&
      changes['projectSeleccionado'].currentValue
    ) {
      const project = changes['projectSeleccionado'].currentValue;
      this.setPartnersFormArray(project.partners);
      this.projectForm.patchValue({
        id: project._id,
        name: project.name,
        url: project.url,
        rrss: project.rrss,
        category: project.category._id,
        ubicacion: project.ubicacion,
        pais: project.pais._id,
        hasVisited: project.hasVisited,
        hasMenu: project.hasMenu,
        dateVisita: project.dateVisita,
        dateAprobado: project.dateAprobado,
        tipoMenu: project.tipoMenu,
        notificado: project.notificado,
        status: project.status,
      });
      this.title = 'Editando Proyecto';
    }
  }

  getCategorias() {
    this.categoryService.getCategories().subscribe((resp: any) => {
      // console.log(resp);
      this.categorias = resp;
    });
  }
  getPaises() {
    this.paisService.getPaises().subscribe((resp: any) => {
      this.paises = resp;
    });
  }

  getPartners() {
    this.usuarioService.getAllEditors().subscribe((resp: any) => {
      console.log(resp);
      this.partners = resp;
      this.setPartnersFormArray([]);
    });
  }

  setPartnersFormArray(selectedPartners: string[]) {
    const partnersFormArray = this.fb.array([]);
    if (this.partners && this.partners.length > 0) {
      this.partners.forEach((partner) => {
        const isSelected = selectedPartners.includes(partner.uid);
        partnersFormArray.push(new FormControl(isSelected));
      });
    }
    this.projectForm.setControl('partners', partnersFormArray);
  }

  validarFormulario() {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      url: [''],
      rrss: ['', Validators.required],
      category: ['', Validators.required],
      hasMenu: ['', Validators.required],
      tipoMenu: ['', Validators.required],
      ubicacion: ['', Validators.required],
      pais: ['', Validators.required],
      dateVisita: [''],
      dateAprobado: [''],
      status: [false],
      hasVisited: [false],
      notificado: [false],
      partners: this.fb.array([],),
      // img: [''],
      id: [''],
    });
  }

  // cargarProject(_id: string) {
  //   if (_id !== null && _id !== undefined) {
  //     this.title = 'Editando Proyecto';
  //     this.projectService.getProject(_id).subscribe((res) => {
  //       this.projectForm.patchValue({
  //         id: res._id,
  //         name: res.name,
  //         url: res.url,
  //         rrss: res.rrss,
  //         category: res.category._id,
  //         hasVisited: res.hasVisited,
  //         pais: res.pais._id,
  //         dateVisita: res.dateVisita,
  //         dateAprobado: res.dateAprobado,
  //         status: res.status,
  //         hasMenu: res.hasMenu,
  //         ubicacion: res.ubicacion,
  //         tipoMenu: res.tipoMenu,
  //         notificado: res.notificado,
  //         partners: res.partners,
  //       });
  //       this.projectSeleccionado = res;
  //     });
  //   } else {
  //     this.title = 'Creando Proyecto';
  //   }
  // }

  onClose() {
    this.projectSeleccionado = null;
    this.projectForm.reset();
    this.title = 'Creando Proyecto';
    // Also reset default values if needed
    this.projectForm.patchValue({
      status: false,
      hasVisited: false,
      hasMenu: false,
      notificado: false
    });
    // Emit event to parent to reset the projectSeleccionado variable
    this.closeModal.emit();
  }


  handleSubmit() {
    if (!this.projectForm.valid) {
      //mostramos las alertas de los campos requeridos
      this.projectForm.markAllAsTouched(); // Esto activa las validaciones visuales
      return
    }

    this.isLoading = true;
    const { nombre } = this.projectForm.value;

    // const formData = new FormData();
    // formData.append('name', this.projectForm.value.name);
    // formData.append('url', this.projectForm.value.url);
    // if (this.projectForm.value.category) {
    //   formData.append('category', this.projectForm.value.category);
    // }

    // if (this.projectForm.value.hasVisited) {
    //   formData.append('hasVisited', this.projectForm.value.hasVisited);
    // }
    // if (this.projectForm.value.dateVista) {
    //   formData.append('dateVista', this.projectForm.value.dateVista);
    // }
    // if (this.projectForm.value.type) {
    //   formData.append('type', this.projectForm.value.type);
    // }
    // if (this.FILE_AVATAR) {
    //   formData.append('imagen', this.FILE_AVATAR);
    // }

    // Extract selected partner IDs from the FormArray
    const selectedPartners = this.projectForm.value.partners
      .map((checked, i) => (checked ? this.partners[i].uid : null))
      .filter((v) => v !== null);

    const dataToSend = {
      ...this.projectForm.value,
      // formData,
      partners: selectedPartners,
    };

    if (this.projectSeleccionado) {
      //actualizar
      const data = {
        ...dataToSend,
        _id: this.projectSeleccionado._id,
      };
      this.projectService.updateProject(data).subscribe((resp) => {
        this.isLoading = false;
        Swal.fire(
          'Actualizado',
          `${nombre}  actualizado correctamente`,
          'success'
        );

        // Close modal programmatically
        const modalElement = document.getElementById('editProject');
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();

        }
        // Emit event to refresh project list
        this.refreshProjectList.emit();
        this.ngOnInit()
      });
    } else {
      //crear
      this.projectService.createProject(dataToSend).subscribe((resp: any) => {
        this.isLoading = false;
        Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
        // Close modal programmatically
        const modalElement = document.getElementById('editProject');
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
        // Emit event to refresh project list
        this.refreshProjectList.emit();
        // this.enviarNotificacion();
        this.ngOnInit()
      });
    }
  }
}
