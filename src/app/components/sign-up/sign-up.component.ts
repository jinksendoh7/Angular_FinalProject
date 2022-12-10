import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  isError: boolean = false;
  constructor(
    public authService: AuthService
  ) { }
  ngOnInit() { }

  onSignUp(email: string, password: string, confirm:string ): void{
    if(password === confirm){
       this.authService.SignUp(email, password)
    }
    else{
      this.isError = true;
    }
  }
}
