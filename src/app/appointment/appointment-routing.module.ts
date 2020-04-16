import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppointmentPage } from './appointment.page';
import { AddNewComponent } from './add-new/add-new.component';
import { ApptListComponent } from './appt-list/appt-list.component';
const routes: Routes = [
  {
    path: '',
    component: AppointmentPage
  },
  {
    path: 'new',
    component: AddNewComponent
  },
  {
    path: 'list',
    component: ApptListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentPageRoutingModule { }
