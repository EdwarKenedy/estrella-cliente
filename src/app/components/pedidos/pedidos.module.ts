import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { PedidosComponent } from './pedidos.component';
import { PedidoComponent } from './pedido/pedido.component';
import { ListaPedidosComponent } from './lista-pedidos/lista-pedidos.component';
import {
  SeleccionarClienteComponent
} from './pedido/seleccionar-cliente/seleccionar-cliente.component';
import {
  AgregarProductoComponent
} from './pedido/agregar-producto/agregar-producto.component';
import {
  FacturasPedidosComponent
} from './facturas-pedidos/facturas-pedidos.component';
import {
  ReportesPedidosComponent
} from './reportes-pedidos/reportes-pedidos.component';

import {
  DayClickedDialogComponent
} from './day-clicked-dialog/day-clicked-dialog.component';
import { DateAdapter, CalendarModule } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { customPaginator } from '@components/paginator/custom.paginator';
import { GoogleMapsModule } from '@angular/google-maps';

const routes: Routes = [
  {
    path: '',
    component: PedidosComponent
  },
  {
    path: 'lista-pedidos',
    component: ListaPedidosComponent
  },
  {
    path: 'nuevo-pedido',
    component: PedidoComponent,
    data: {
      breadcrumb: 'Nuevo pedido'
    }
  },
  {
    path: 'facturas',
    component: FacturasPedidosComponent,
    data: {
      breadcrumb: 'Facturas'
    }
  },
  {
    path: 'reportes',
    component: ReportesPedidosComponent,
    data: {
      breadcrumb: 'Reportes'
    }
  },
  {
    path: ':id',
    component: PedidoComponent,
    data: {
      breadcrumb: 'Editar pedido'
    }
  }
];

@NgModule({
  declarations: [
    PedidosComponent,
    DayClickedDialogComponent,
    PedidoComponent,
    SeleccionarClienteComponent,
    AgregarProductoComponent,
    ListaPedidosComponent,
    FacturasPedidosComponent,
    ReportesPedidosComponent
  ],
  imports: [
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatBadgeModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSelectModule,
    MatPaginatorModule,
    GoogleMapsModule,
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useValue: customPaginator('Pedidos por página')
    }
  ]
})
export class PedidosModule { }
