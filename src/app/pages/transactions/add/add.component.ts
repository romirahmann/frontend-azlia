import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  formAddTransactions!: FormGroup;
  formEditTransactions!: FormGroup;
  barang!: any;
  supplier!: any;
  rak!: any;
  categories!: any;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private apiService: ApiService
  ) {}
  ngOnInit() {
    this.createFormAdd();
    this.getAllBarang();
    this.getAllSupplier();
    this.getAllRak();
    this.getAllCategory();
  }
  getAllBarang() {
    this.apiService.getAllBarang().subscribe((res: any) => {
      this.barang = res.data;
    });
  }
  getAllSupplier() {
    this.apiService.getAllSupplier().subscribe((res: any) => {
      this.supplier = res.data;
    });
  }
  getAllRak() {
    this.apiService.getAllRak().subscribe((res: any) => {
      this.rak = res.data;
    });
  }
  getAllCategory() {
    this.apiService.getAllCategories().subscribe((res: any) => {
      this.categories = res.data;
    });
  }
  // ADD ABSENSI
  createFormAdd() {
    this.formAddTransactions = this.fb.group({
      category_transaction_id: ['', Validators.required],
      barang_id: ['', Validators.required],
      id_supplier: ['', [Validators.required]],
      id_rak: ['', [Validators.required]],
      date: ['', [Validators.required]],
      tgl_kadaluarsa: ['', [Validators.required]],
      jumlah_barang: ['', [Validators.required]],
    });
  }
  submitAdd() {
    let data = this.formAddTransactions.value;
    let formData = {
      category_transaction_id: parseInt(data.category_transaction_id),
      barang_id: parseInt(data.barang_id),
      id_supplier: parseInt(data.id_supplier),
      id_rak: parseInt(data.id_rak),
      date: data.date,
      tgl_kadaluarsa: data.tgl_kadaluarsa,
      jumlah_barang: data.jumlah_barang,
    };

    if (formData.category_transaction_id === 1) {
      this.apiService
        .getBarangById(formData.barang_id)
        .subscribe((res: any) => {
          let barang = res.data[0];
          let dataBarang = {
            stok: barang.stok + formData.jumlah_barang,
          };
          this.apiService
            .updateBarang(formData.barang_id, dataBarang)
            .subscribe((res: any) => {
              this.apiService
                .insertTransaction(formData)
                .subscribe((res: any) => {
                  console.log('Add Successfully');
                  this.route.navigate(['/transactions']);
                });
            });
        });
    }
    if (formData.category_transaction_id === 2) {
      this.apiService
        .getBarangById(formData.barang_id)
        .subscribe((res: any) => {
          let barang = res.data[0];
          if (barang.stok < formData.jumlah_barang) {
            alert('Jumlah keluar melebih stok barang!');
            this.createFormAdd();
          } else {
            let dataBarang = {
              stok: barang.stok - formData.jumlah_barang,
            };
            this.apiService
              .updateBarang(formData.barang_id, dataBarang)
              .subscribe((res: any) => {
                this.apiService
                  .insertTransaction(formData)
                  .subscribe((res: any) => {
                    console.log('Add Successfully');
                    this.route.navigate(['/transactions']);
                  });
              });
          }
        });
    }
  }
}
