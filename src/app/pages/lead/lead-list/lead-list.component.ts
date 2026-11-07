import { Component } from '@angular/core';
import { Lead } from 'src/app/models/lead';
import { LeadService } from 'src/app/services/lead.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lead-list',
  standalone:false,
  templateUrl: './lead-list.component.html',
  styleUrl: './lead-list.component.css'
})
export class LeadListComponent {
  public leads: Lead[] = [];
  public cargando: boolean = true;
  public filtroActual: string = 'pendiente';
  title = 'Leads'
  leadSeleccionado: Lead | null = null;

  constructor(private leadService: LeadService) { }

  ngOnInit(): void {
    this.cargarLeads();
  }

  // Función para rellenar la tabla
  cargarLeads(status: string = this.filtroActual): void {
    this.cargando = true;
    this.filtroActual = status;
    
    this.leadService.obtenerLeads(status).subscribe({
      next: (resp) => {
        this.leads = resp.leads;
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.cargando = false;
        Swal.fire('Error', 'No se pudo cargar la lista de prospectos.', 'error');
      }
    });
  }

  // Lógica interactiva al presionar "Aprobar"
  aprobarProspecto(lead: Lead): void {
    if (!lead._id) return;

    Swal.fire({
      title: `¿Aprobar comercio: ${lead.nombreLocal}?`,
      text: "Esto creará automáticamente el usuario y la tienda en los servidores de producción de Zlipmenu.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, aprobar y activar SaaS',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        
        // Mostramos un loader bloqueante porque el backend de producción traduce con Google e inicializa DB
        Swal.fire({
          title: 'Inicializando Entorno...',
          text: 'Creando base de datos, encriptando credenciales y enviando email de bienvenida.',
          allowOutsideClick: false,
          didOpen: () => { Swal.showLoading(); }
        });

        this.leadService.aprobarLead(lead._id!).subscribe({
          next: (resp) => {
            Swal.fire(
              '¡Activado!',
              `El comercio ha sido inicializado con éxito. Clave temporal enviada a su correo.`,
              'success'
            );
            // Recargamos la lista actual para que el registro aprobado desaparezca de la vista "pendiente"
            this.cargarLeads();
          },
          error: (err) => {
            console.error(err);
            // Capturamos el mensaje exacto que nos devuelva el pipeline de producción
            const msgError = err.error?.error || err.error?.msg || 'Error de sincronización.';
            Swal.fire('Fallo de Red', msgError, 'error');
          }
        });
        
      }
    });
  }

  onView(lead: Lead) {
      this.leadSeleccionado = lead;
    }

    PageSize() {
    this.ngOnInit();

  }

}
