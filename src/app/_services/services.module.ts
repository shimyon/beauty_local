import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TosteService, AuthenticationService, AjaxServiceService, LoadingService } from '.';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    TosteService,
    HttpClient,
    AuthenticationService,
    AjaxServiceService,
    LoadingService
  ]
})
export class ServicesModule { }
