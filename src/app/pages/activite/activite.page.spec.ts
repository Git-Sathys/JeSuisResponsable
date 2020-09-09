import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActivitePage } from './activite.page';

describe('ActivitePage', () => {
  let component: ActivitePage;
  let fixture: ComponentFixture<ActivitePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
