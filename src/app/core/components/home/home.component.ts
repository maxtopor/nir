import { Component, OnInit, ViewChild} from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatMenuItem } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { of } from "rxjs/internal/observable/of";





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  
  constructor(private http:HttpClient, private router: Router, private dataService: DataService) { 
  }

  tables = [{
    "НИР":"nir",
    "Реализация НИР":"realization",
    "Внедрение НИР в производство":"nir-impl-prod",
    "Внедрение НИР в ученый процесс":"nir-impl-stud",
    "Патенты":"patents",
    "Публикации":"publications",
    "Участие в выставках":"part-in-exhib",
    "Преподаватели":"teachers"
  
  }];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  tableName;
  documents = [];
  tableFields = [];
  dataSource: MatTableDataSource<any>;
  getValue(val:any){
    if(val instanceof Object){
      return val.id;
    }
    else return val;
   
  }

  getData(any){
    this.dataService.getData(this.tables[0][any]).subscribe(data =>{
      this.documents = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.tableName = any;
    },error =>console.log(error), ()=> this.dataService.getFields(this.tables[0][this.tableName]).subscribe(data =>{
      this.tableFields = data;
      console.log(this.tableFields);
    })); 
    
  }
  a: any;
  addData(){
    this.a ={};
    for(let table of this.tableFields){
      this.a[table] = '';
    }
    console.log(this.dataSource);
    this.dataSource.data.push(this.a);
    this.dataSource._updateChangeSubscription();

  }
  confirm(){
    console.log(this.a);
    this.dataService.addData(this.tables[0][this.tableName],this.a).subscribe();
  }

  update(){
    for(let row of this.dataSource.data){
      this.dataService.updateData(this.tables[0][this.tableName], row).subscribe(data =>
        console.log(data));
    }
    
  }
  ////// ИСПРАВИТЬ ПОЛЯ НА НУЛЛАБЛЕ ФОЛС
  print(){
    console.log(this.tables[0][this.tableName]);
  }
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  
  isObject(obj: any):boolean{
    if(obj instanceof Object){
      return true;
    }
    else {
      return false;
    }
    
  }
  prind(val){
    console.log(val);
  }


}




