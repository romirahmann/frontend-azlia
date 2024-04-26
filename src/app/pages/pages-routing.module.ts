import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { DataBarangComponent } from './data-barang/data-barang.component';
import { JenisBarangComponent } from './jenis-barang/jenis-barang.component';
import { RakGudangComponent } from './rak-gudang/rak-gudang.component';
import { SatuanBarangComponent } from './satuan-barang/satuan-barang.component';
import { SupplierComponent } from './supplier/supplier.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AddComponent } from './transactions/add/add.component';
import { EditComponent } from './transactions/edit/edit.component';
import { DetailComponent } from './transactions/detail/detail.component';
import { ExportPdfComponent } from './export-pdf/export-pdf.component';

const routes: Routes = [
  { path: 'user', component: UsersComponent },
  { path: 'data-barang', component: DataBarangComponent },
  { path: 'jenis-barang', component: JenisBarangComponent },
  { path: 'rak-gudang', component: RakGudangComponent },
  { path: 'satuan-barang', component: SatuanBarangComponent },
  { path: 'supplier', component: SupplierComponent },
  { path: '', component: TransactionsComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'add-transaction', component: AddComponent },
  { path: 'edit-transaction/:id', component: EditComponent },
  { path: 'detail-transaction/:id', component: DetailComponent },
  { path: 'export-pdf', component: ExportPdfComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
