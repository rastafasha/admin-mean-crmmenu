import { Component, OnInit, Input, ViewChild, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

declare var jQuery: any;
declare var $: any;

declare var bootstrap: any;

@Component({
  selector: 'app-reportar-pago',
  templateUrl: './reportar-pago.component.html',
  styleUrls: ['./reportar-pago.component.css']
})
export class ReportarPagoComponent implements OnInit, OnChanges  {

  @Input() selectedPayment: Payment | null = null;
  @Output() refreshProjectList: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  public PaymentRegisterForm: FormGroup;

  title = 'Realizar un Pago';
  isLoading: boolean = false;

  cartItems: any[] = [];
  Item: any[] = [];
  total = 0;

  public usuario;
  visible: boolean = false;

  metodo: string;
  error: string;
  pagoSeleccionado: Payment;
  pagoS: Payment;

  uploadError: boolean;
  imagePath: string;

  user: User;

  public storage = environment.apiUrlMedia



  constructor(
    private fb: FormBuilder,
    private location: Location,
    private paymentService: PaymentService,
    private usuarioService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.usuario = usuarioService.usuario;
    const base_url = environment.apiUrl;
  }


  ngOnInit(): void {
    this.visible = false;
    this.validarFormulario();
    this.total = this.getTotal();

  }


  getTotal(): number {
    let total = 0;
    this.cartItems.forEach(item => {
      total += item.quantity * item.productPrice;
    });
    return +total.toFixed(2);
  }


  ngOnChanges(changes: SimpleChanges): void {
      if (
        changes['selectedPayment'] &&
        changes['selectedPayment'].currentValue
      ) {
        const payment = changes['selectedPayment'].currentValue;
       
        this.PaymentRegisterForm.patchValue({
          id: payment._id,
          metodo: payment.metodo,
          bank_name: payment.bank_name,
          cliente: payment.cliente,
          monto: payment.monto,
          referencia: payment.referencia,
          pais: payment.pais._id,
          hasVisited: payment.hasVisited,
          hasMenu: payment.hasMenu,
          dateVisita: payment.dateVisita,
          dateAprobado: payment.dateAprobado,
          tipoMenu: payment.tipoMenu,
          notificado: payment.notificado,
          status: payment.status,
        });
        this.title = 'Editando Pago';
      }
    }
  validarFormulario() {
    this.PaymentRegisterForm = this.fb.group({
      id: [''],
      metodo: ['', Validators.required],
      bank_name: [''],
      monto: ['', Validators.required],
      referencia: [''],
      email: [''],
      nombre: [''],
      plan_id: [''],
      // status: ['PENDING'],
      // validacion: ['PENDING'],
      metodo_id: ['1'],
      user_id: [''],
      image: [''],
    })
  }



  get image() {
    return this.PaymentRegisterForm.get('image');
  }

  avatarUpload(datos) {
    const data = JSON.parse(datos.response);
    this.PaymentRegisterForm.controls['image'].setValue(data.image);//almaceno el nombre de la imagen
  }


  handleSubmit() {

    if (!this.PaymentRegisterForm.valid) {
      //mostramos las alertas de los campos requeridos
      this.PaymentRegisterForm.markAllAsTouched(); // Esto activa las validaciones visuales
      return
    }
    this.isLoading = true;
    const formData = new FormData();
    formData.append('metodo', this.PaymentRegisterForm.get('metodo').value);
    formData.append('bank_name', this.PaymentRegisterForm.get('bank_name').value);
    formData.append('monto', this.PaymentRegisterForm.get('monto').value);
    formData.append('currency_id', this.PaymentRegisterForm.get('currency_id').value);
    formData.append('referencia', this.PaymentRegisterForm.get('referencia').value);
    formData.append('nombre', this.PaymentRegisterForm.get('nombre').value);
    formData.append('email', this.PaymentRegisterForm.get('email').value);
    formData.append('plan_id', this.PaymentRegisterForm.get('plan_id').value);
    formData.append('metodo_id', '1');
    // formData.append('status', 'PENDING');
    // formData.append('validacion', 'PENDING');
    formData.append('image', this.PaymentRegisterForm.get('image').value);


    if (this.selectedPayment) {
      //actualizar
      const data = {
        ...this.PaymentRegisterForm,
        _id: this.selectedPayment._id,
      };
      this.paymentService.updatePayment(data).subscribe((resp) => {
        this.isLoading = false;
        Swal.fire(
          'Actualizado',
          `  actualizado correctamente`,
          'success'
        );

        // Close modal programmatically
        const modalElement = document.getElementById('reportarPagoModal');
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
      const data = {
        ...this.PaymentRegisterForm.value,
        user_id: this.usuario.id
      }
      this.paymentService.createPayment(data)
        .subscribe((resp: any) => {
          Swal.fire('Creado', `creado correctamente`, 'success');

  const modalElement = document.getElementById('reportarPagoModal');
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();
          }
          // Emit event to refresh project list
          this.refreshProjectList.emit();
          // this.enviarNotificacion();
          this.ngOnInit();
          this.closeModal.emit();
        });

    }



  }



  onClose() {
    this.selectedPayment = null;
    this.PaymentRegisterForm.reset();
    this.title = 'Creando Proyecto';
    // Also reset default values if needed
    this.PaymentRegisterForm.patchValue({
      status: false,
      hasVisited: false,
      hasMenu: false,
      notificado: false
    });
    // Emit event to parent to reset the projectSeleccionado variable
    this.closeModal.emit();
  }



}
