import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppointmentPage } from './appointment.page';
import { AddNewComponent } from './add-new/add-new.component';
import { ApptListComponent } from './appt-list/appt-list.component';
import { ApptViewComponent } from './appt-view/appt-view.component';
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
  },
  {
    path: 'view',
    component: ApptViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentPageRoutingModule { }
