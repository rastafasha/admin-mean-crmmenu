import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';


// import * as $ from 'jquery';
//declare function init_plugins();

declare var $: any;
declare var jQuery: any;



@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styles: []
})


export class MenuComponent implements OnInit {

  @ViewChild('sidenav') sidenav;

  public user: User;

  error: string;
  id: any;
  roleid:number;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.user = userService.usuario;
   }

  ngOnInit(): void {
    this.getUser();
  }


  toggleNav(){
    this.sidenav.toggle();
  }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    this.id = this.user.uid;
    // console.log(this.user);
    // this.activatedRoute.params.subscribe( ({id}) => this.getUserProfile(id));
  }


  logout(): void {
    this.userService.logout();
  }

}
