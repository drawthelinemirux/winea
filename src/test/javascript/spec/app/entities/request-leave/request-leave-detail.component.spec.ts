import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WineaTestModule } from '../../../test.module';
import { RequestLeaveDetailComponent } from 'app/entities/request-leave/request-leave-detail.component';
import { RequestLeave } from 'app/shared/model/request-leave.model';

describe('Component Tests', () => {
  describe('RequestLeave Management Detail Component', () => {
    let comp: RequestLeaveDetailComponent;
    let fixture: ComponentFixture<RequestLeaveDetailComponent>;
    const route = ({ data: of({ requestLeave: new RequestLeave(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WineaTestModule],
        declarations: [RequestLeaveDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RequestLeaveDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RequestLeaveDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load requestLeave on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.requestLeave).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
