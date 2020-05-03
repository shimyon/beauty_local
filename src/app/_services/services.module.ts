import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TosteService, AuthenticationService, AjaxServiceService, LoadingService, AppSharedService } from '.';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AppSharedService,
    TosteService,
    HttpClient,
    AuthenticationService,
    AjaxServiceService,
    LoadingService
  ]
})
export class ServicesModule { }
