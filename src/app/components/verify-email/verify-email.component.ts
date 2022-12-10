import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  constructor(
    public authService: AuthService
  ) { }
  isLoading: boolean = false;
  ngOnInit() {
  }
  onSendVerify(){
    this.isLoading = true;
    setTimeout(()=>{
      this.authService.SendVerificationMail();
      this.isLoading = false;
    },1000)

  }
}
