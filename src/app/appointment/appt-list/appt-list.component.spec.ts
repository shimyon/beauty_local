import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ApptListComponent } from './appt-list.component';

describe('ApptListComponent', () => {
  let component: ApptListComponent;
  let fixture: ComponentFixture<ApptListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApptListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ApptListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
