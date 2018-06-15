import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form : FormGroup;
  constructor(private formBuilder : FormBuilder, private dataService: DataService, private router : Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username:'',
      password:''
    });
  }
  status: string = '';
  login(){
    this.dataService.getToken(this.form.get("username").value+":"+this.form.get("password").value).subscribe(
      data=>{
        console.log(data);
        this.router.navigate(['home']);
      },
      err=>
      this.status = "неправильные e-mail и/или пароль"
    );
  }
  
  isAlert(){
    if (this.status!="")
      return true;
    else 
      return false;
  }
  

}
