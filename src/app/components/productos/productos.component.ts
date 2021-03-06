import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Producto } from '@models/producto.model';
import { ProductoService } from '@services/producto.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import {
  DetallesProductoDialogComponent
} from './detalles-producto-dialog/detalles-producto-dialog.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit, OnDestroy {
  productos$: Observable<Producto[]>;
  private unsubscribe = new Subject<void>();
  buscadorForm: FormGroup;
  totalProductos: number;
  @ViewChild('paginator') paginator: MatPaginator;

  constructor(
    private productoService: ProductoService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.buscadorForm = this.fb.group({
      termino: ['']
    });

    this.productos$ = this.obtenerProductos(0, 12);

    this.termino.valueChanges.pipe(
      takeUntil(this.unsubscribe),
      debounceTime(300),
      map(() => {
        this.paginator.firstPage();
        return this.productos$ = this.obtenerProductos(0, 12);
      })
    ).subscribe();
  }

  obtenerProductos(skip: number, take: number): Observable<Producto[]> {
    const termino = this.termino.value;

    return this.productoService.obtenerProductos(skip, take, termino)
    .pipe(
      map(resp => {
        this.totalProductos = resp.total;
        return resp.productos;
      })
    );
  }

  updateTable(pageEvent: PageEvent): void {
    const take = pageEvent.pageSize;
    const skip = pageEvent.pageIndex * take;

    this.productos$ = this.obtenerProductos(skip, take);
  }

  limpiarBusqueda(): void {
    this.termino.setValue('');
  }

  verDetalles(producto: Producto): void {
    this.dialog.open(
      DetallesProductoDialogComponent,
      { data: producto }
    );
  }

  get termino(): AbstractControl {
    return this.buscadorForm.get('termino');
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
