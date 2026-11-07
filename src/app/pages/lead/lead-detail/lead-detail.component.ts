import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
declare var bootstrap: any;

@Component({
  selector: 'app-lead-detail',
  standalone:false,
  templateUrl: './lead-detail.component.html',
  styleUrl: './lead-detail.component.css'
})
export class LeadDetailComponent implements OnInit, OnChanges{

  @Input() leadSeleccionado;
  @Output() refreshClientList: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  title: string;

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['leadSeleccionado'] &&
      changes['leadSeleccionado'].currentValue
    ) {
      const cliente = changes['leadSeleccionado'].currentValue;
      // this.setPartnersFormArray(cliente.partners);
      // this.clienteForm.patchValue({
      //   id: cliente._id,
      //   name: cliente.name,
      //   url: cliente.url,
      //   rrss: cliente.rrss,
      //   category: cliente.category._id,
      //   ubicacion: cliente.ubicacion,
      //   pais: cliente.pais._id,
      //   hasVisited: cliente.hasVisited,
      //   dateTest: cliente.dateTest,
      //   dateInicio: cliente.dateInicio,
      //   status: cliente.status,
      // });
      // this.title = 'Editando Cliente';
      this.leadSeleccionado = cliente;
    }
  }

  onClose() {
    this.leadSeleccionado = null;
    // this.clienteForm.reset();
    // this.title = 'Creando Cliente';
    // Also reset default values if needed
    // this.clienteForm.patchValue({
    //   status: false,
    // });
    // Emit event to parent to reset the leadSeleccionado variable
    this.closeModal.emit();
  }

}
