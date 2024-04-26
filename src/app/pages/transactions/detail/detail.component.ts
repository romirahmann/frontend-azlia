import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {
  paramsId: any;
  dataTransaksi!: any;
  constructor(
    private apiService: ApiService,
    private activeRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.getParamsId();
  }

  getParamsId() {
    this.activeRoute.params.subscribe((params: any) => {
      this.paramsId = +params['id'];
      console.log(this.paramsId);
      this.getTransactionById();
    });
  }

  getTransactionById() {
    this.apiService.getTransactionById(this.paramsId).subscribe((res: any) => {
      console.log(res.data[0]);
      this.dataTransaksi = res.data[0];
    });
  }
}
