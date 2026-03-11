import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  errors:any = null;
  roles: string[] = [];

  public auth2: any;

  user: User;

  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email] ],
    password: ['', Validators.required],
    remember: [false]

  });

  // Registro
  public formSumitted = false;

  public registerForm = this.fb.group({
    username: ['', Validators.required],
    email: [ '', [Validators.required] ],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    roles: ['USER'],
    terminos: [false, Validators.required],

  }, {
    validators: this.passwordsIguales('password', 'confirmPassword')

  });
  // Registro



  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UserService,
    private ngZone: NgZone
  ) {}

ngOnInit(){
  this.renderButton();

}
login(){

  this.usuarioService.login(this.loginForm.value).subscribe(
    resp =>{
      if(this.loginForm.get('remember').value){
        localStorage.setItem('email', this.loginForm.get('email').value);
      }else{
        localStorage.removeItem('email');
      }
      this.router.navigateByUrl('/dashboard');
    },(err) => {
      Swal.fire('Error', err.error.msg, 'error');
    }
  )



}

renderButton() {
  gapi.signin2.render('my-signin2', {
    'scope': 'profile email',
    'width': 240,
    'height': 50,
    'longtitle': true,
    'theme': 'dark',
  });
  this.startApp();

  
}

async startApp(){
  this.usuarioService.googleInit();
  this.auth2 = this.usuarioService.auth2;

  this.attachSignin(document.getElementById('my-signin2'));
  
}

attachSignin(element) {
  this.auth2.attachClickHandler(element, {},
      (googleUser) =>{
        const id_token = googleUser.getAuthResponse().id_token;

        this.usuarioService.loginGoogle(id_token).subscribe(
          resp=>{

            this.ngZone.run(()=>{
              this.router.navigateByUrl('/dashboard');
            })
          }
        );

        console.log(gapi.auth2.getAuthInstance())

      }, (error) =>{
        alert(JSON.stringify(error, undefined, 2));
      });

      
}




// Registro
crearUsuario(){
  this.formSumitted = true;
  this.usuarioService.crearUsuario(this.registerForm.value).subscribe(
    resp =>{
      Swal.fire('Registrado!', `Ya puedes ingresar`, 'success');
      this.ngOnInit();
    },(error) => {
      Swal.fire('Error', error.error.msg, 'error');
      this.errors = error.error;
    }
  );
  return false;
}

campoNoValido(campo: string): boolean {
  if(this.registerForm.get(campo).invalid && this.formSumitted){
    return true;
  }else{
    return false;
  }


}

aceptaTerminos(){
  return !this.registerForm.get('terminos').value && this.formSumitted;
}

passwordNoValido(){
  const pass1 = this.registerForm.get('password').value;
  const pass2 = this.registerForm.get('confirmPassword').value;

  if((pass1 !== pass2) && this.formSumitted){
    return true;
  }else{
    return false;
  }
}

passwordsIguales(pass1Name: string, pass2Name: string){
  return (formGroup: FormGroup) =>{
    const pass1Control = formGroup.get(pass1Name);
    const pass2Control = formGroup.get(pass2Name);

    if(pass1Control.value === pass2Control.value){
      pass2Control.setErrors(null)
    }else{
      pass2Control.setErrors({noEsIgual: true});
    }
  }
}
// Registro



}
