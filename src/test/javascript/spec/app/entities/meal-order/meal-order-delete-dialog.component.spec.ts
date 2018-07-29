/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SeekTestModule } from '../../../test.module';
import { MealOrderDeleteDialogComponent } from 'app/entities/meal-order/meal-order-delete-dialog.component';
import { MealOrderService } from 'app/entities/meal-order/meal-order.service';

describe('Component Tests', () => {
    describe('MealOrder Management Delete Component', () => {
        let comp: MealOrderDeleteDialogComponent;
        let fixture: ComponentFixture<MealOrderDeleteDialogComponent>;
        let service: MealOrderService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [MealOrderDeleteDialogComponent]
            })
                .overrideTemplate(MealOrderDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MealOrderDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MealOrderService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
