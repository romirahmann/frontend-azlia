import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsComponent } from './layouts.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalUsersComponent } from './modal/modal-users/modal-users.component';
import { ModalSupplierComponent } from './modal/modal-supplier/modal-supplier.component';
import { ModalJenisBarangComponent } from './modal/modal-jenis-barang/modal-jenis-barang.component';
import { ModalSatuanBarangComponent } from './modal/modal-satuan-barang/modal-satuan-barang.component';
import { ModalDataBarangComponent } from './modal/modal-data-barang/modal-data-barang.component';
import { ModalRakGudangComponent } from './modal/modal-rak-gudang/modal-rak-gudang.component';
import { ModalTransactionComponent } from './modal/modal-transaction/modal-transaction.component';

@NgModule({
  declarations: [
    LayoutsComponent,
    SidebarComponent,
    ModalUsersComponent,
    ModalSupplierComponent,
    ModalJenisBarangComponent,
    ModalSatuanBarangComponent,
    ModalDataBarangComponent,
    ModalRakGudangComponent,
    ModalTransactionComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [
    SidebarComponent,
    ModalUsersComponent,
    ModalSupplierComponent,
    ModalJenisBarangComponent,
    ModalSatuanBarangComponent,
    ModalDataBarangComponent,
    ModalRakGudangComponent,
    ModalTransactionComponent,
  ],
})
export class LayoutsModule {}
