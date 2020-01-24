import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { WineaTestModule } from '../../../test.module';
import { RequestLeaveUpdateComponent } from 'app/entities/request-leave/request-leave-update.component';
import { RequestLeaveService } from 'app/entities/request-leave/request-leave.service';
import { RequestLeave } from 'app/shared/model/request-leave.model';

describe('Component Tests', () => {
  describe('RequestLeave Management Update Component', () => {
    let comp: RequestLeaveUpdateComponent;
    let fixture: ComponentFixture<RequestLeaveUpdateComponent>;
    let service: RequestLeaveService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WineaTestModule],
        declarations: [RequestLeaveUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RequestLeaveUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RequestLeaveUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RequestLeaveService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RequestLeave(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new RequestLeave();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
