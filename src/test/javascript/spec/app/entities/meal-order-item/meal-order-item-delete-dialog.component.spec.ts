/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SeekTestModule } from '../../../test.module';
import { MealOrderItemDeleteDialogComponent } from 'app/entities/meal-order-item/meal-order-item-delete-dialog.component';
import { MealOrderItemService } from 'app/entities/meal-order-item/meal-order-item.service';

describe('Component Tests', () => {
    describe('MealOrderItem Management Delete Component', () => {
        let comp: MealOrderItemDeleteDialogComponent;
        let fixture: ComponentFixture<MealOrderItemDeleteDialogComponent>;
        let service: MealOrderItemService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [MealOrderItemDeleteDialogComponent]
            })
                .overrideTemplate(MealOrderItemDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MealOrderItemDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MealOrderItemService);
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
