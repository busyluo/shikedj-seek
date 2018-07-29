/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SeekTestModule } from '../../../test.module';
import { DishDeleteDialogComponent } from 'app/entities/dish/dish-delete-dialog.component';
import { DishService } from 'app/entities/dish/dish.service';

describe('Component Tests', () => {
    describe('Dish Management Delete Component', () => {
        let comp: DishDeleteDialogComponent;
        let fixture: ComponentFixture<DishDeleteDialogComponent>;
        let service: DishService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [DishDeleteDialogComponent]
            })
                .overrideTemplate(DishDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DishDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DishService);
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
