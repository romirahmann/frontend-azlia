import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LayoutsModule } from '../layouts/layouts.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { SupplierComponent } from './supplier/supplier.component';
import { JenisBarangComponent } from './jenis-barang/jenis-barang.component';
import { SatuanBarangComponent } from './satuan-barang/satuan-barang.component';
import { DataBarangComponent } from './data-barang/data-barang.component';
import { RakGudangComponent } from './rak-gudang/rak-gudang.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AddComponent } from './transactions/add/add.component';
import { DetailComponent } from './transactions/detail/detail.component';
import { EditComponent } from './transactions/edit/edit.component';
import { ExportPdfComponent } from './export-pdf/export-pdf.component';

@NgModule({
  declarations: [
    UsersComponent,
    SupplierComponent,
    JenisBarangComponent,
    SatuanBarangComponent,
    DataBarangComponent,
    RakGudangComponent,
    TransactionsComponent,
    AddComponent,
    DetailComponent,
    EditComponent,
    ExportPdfComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    LayoutsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class PagesModule {}
