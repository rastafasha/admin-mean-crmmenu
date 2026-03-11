import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit {
  title = 'Admin Usuario';
  public user: User;
  public userprofile: User;
  displaycomponent: string = 'none';
  limit = 3;

  error: string;

  uid:string;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.user = userService.usuario;
  }

  ngOnInit(): void {
    this.closeMenu();
    this.getUser();
    window.scrollTo(0,0);
    // this.getUserProfile();
  }

  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");
      }
  }

  getUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.uid = this.user.uid;
    // this.getUserProfile();
    console.log(this.user)
  }

  getUserProfile(){
    this.userService.getUserById(this.user.uid).subscribe(
      res =>{
        this.userprofile = res[0];
        error => this.error = error;
        console.log(this.userprofile)
      }
    );
    // if(this.user.profiles == null ){
    //   Swal.fire('Debes llenar tu perfil y aceptar las condiciones');
    // }
  }



}
