import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
  formEditTransactions!: FormGroup;
  paramsId!: number;
  barang!: any;
  supplier!: any;
  rak!: any;
  categories!: any;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private apiService: ApiService,
    private activeRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.getParamsId();
  }
  getParamsId() {
    this.activeRoute.params.subscribe((params: any) => {
      this.paramsId = +params['id'];
      this.createFormEdit();
      this.getAllBarang();
      this.getAllSupplier();
      this.getAllRak();
      this.getAllCategory();
    });
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
  createFormEdit() {
    this.apiService.getTransactionById(this.paramsId).subscribe((res: any) => {
      let data = res.data[0];
      this.formEditTransactions = this.fb.group({
        category_transaction_id: [data.category_transaction_id],
        barang_id: [data.barang_id],
        id_supplier: [data.id_supplier],
        id_rak: [data.id_rak],
        date: [data.date],
        tgl_kadaluarsa: [data.tgl_kadaluarsa],
      });
    });
  }
  submitEdit() {
    console.log();
    // this.apiService
    //   .updateTransaction(this.paramsId, this.formEditTransactions.value)
    //   .subscribe((res: any) => {
    //     console.log('Update Succesfully');
    //     this.route.navigate(['/transaction']);
    //   });
  }
}
