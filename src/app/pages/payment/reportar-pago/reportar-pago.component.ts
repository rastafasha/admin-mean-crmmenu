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
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/cliente';

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
export class ReportarPagoComponent implements OnInit, OnChanges {

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
  clientes: Cliente;


  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private usuarioService: UserService,
    private clienteService: ClienteService,
  ) {
    this.usuario = usuarioService.usuario;
    const base_url = environment.apiUrl;
  }


  ngOnInit(): void {
    this.visible = false;
    this.validarFormulario();
    this.total = this.getTotal();
    this.getClientes();

    
  }
  getClientes(){
    this.clienteService.getClientes().subscribe((resp:any)=>{
      this.clientes = resp;
    })
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
        cliente: payment.cliente?._id || payment.cliente, // Por si viene populado
        amount: payment.amount,
        tipo_pago: payment.tipo_pago,
        metodo_pago: payment.metodo_pago,
        referencia: payment.referencia,
        bank_destino: payment.bank_destino,
        fecha_verificacion: payment.fecha_verificacion,
        status: payment.status,
        // Cargamos los IDs de la repartición guardada
        vendedorId: payment.reparticion?.vendedor?.id,
        adminId: payment.reparticion?.admin?.id,
        ceoId: payment.reparticion?.ceo?.id
      });
      this.title = 'Editando Pago';
    }
  }
  validarFormulario() {
    this.PaymentRegisterForm = this.fb.group({
      id: [''],
      cliente: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]], // Validar que sea número > 0
      tipo_pago: ['', Validators.required],
      referencia: ['', Validators.required],
      metodo_pago: ['', Validators.required],
      bank_destino: ['', Validators.required],
      fecha_verificacion: [new Date(), Validators.required],
      status: [false],
      // Campos ocultos o automáticos para la repartición
      vendedorId: ['', Validators.required],
      adminId: ['', Validators.required],
      ceoId: ['', Validators.required]
    })
  }



  handleSubmit() {debugger

    if (!this.PaymentRegisterForm.valid) {
      //mostramos las alertas de los campos requeridos
      this.PaymentRegisterForm.markAllAsTouched(); // Esto activa las validaciones visuales
      return
    }
    this.isLoading = true;
    // Creamos un objeto JSON en lugar de FormData


    const paymentData = {
      ...this.PaymentRegisterForm.value,
      // Aseguramos que sea número para que el 33.3% se calcule bien
      amount: Number(this.PaymentRegisterForm.get('amount').value),
      // Si usas el sistema de repartición, asegúrate de que estos IDs vayan en el objeto
      vendedorId: this.PaymentRegisterForm.get('vendedorId').value,
      adminId: this.PaymentRegisterForm.get('adminId').value,
      ceoId: this.PaymentRegisterForm.get('ceoId').value
    };


    if (this.selectedPayment) {
      //actualizar
      this.paymentService.updatePayment(paymentData).subscribe((resp) => {
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

      this.paymentService.createPayment(paymentData)
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
