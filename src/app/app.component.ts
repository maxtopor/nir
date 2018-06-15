import { Component, Pipe, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from './core/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private dataService: DataService, private router: Router){}
  ngOnInit(): void {
    if (localStorage.getItem("token")){
      this.dataService.checkToken().subscribe(data=>{
        if (data.status=="ERROR")
          this.router.navigate(["login"]);
        else
          this.router.navigate([""]);  
      });
    }
    else
      this.router.navigate(["login"]);
  }
}



