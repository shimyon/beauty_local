import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppointmentPageRoutingModule } from './appointment-routing.module';

import { AppointmentPage } from './appointment.page';
import { AddNewComponent } from './add-new/add-new.component';
import { NgCalendarModule } from 'ionic2-calendar';
import { ApptListComponent } from './appt-list/appt-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppointmentPageRoutingModule,
    NgCalendarModule
  ],
  declarations: [
    AppointmentPage,
    AddNewComponent,
    ApptListComponent    
  ]
})
export class AppointmentPageModule { }
