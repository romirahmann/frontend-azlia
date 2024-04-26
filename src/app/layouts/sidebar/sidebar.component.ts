import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  userLogin!: any;
  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.getDataUserLogin();
  }
  getDataUserLogin() {
    this.userLogin = this.authService.getUserLogin();
    console.log(this.userLogin);
  }
  toogleDataMaster() {
    const dataMaster = document.querySelector('#submenu-data-master');
    dataMaster?.classList.toggle('hidden');
  }
  logout() {
    this.authService.logout();
  }
}
