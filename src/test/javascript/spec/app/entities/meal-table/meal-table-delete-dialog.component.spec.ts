/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SeekTestModule } from '../../../test.module';
import { MealTableDeleteDialogComponent } from 'app/entities/meal-table/meal-table-delete-dialog.component';
import { MealTableService } from 'app/entities/meal-table/meal-table.service';

describe('Component Tests', () => {
    describe('MealTable Management Delete Component', () => {
        let comp: MealTableDeleteDialogComponent;
        let fixture: ComponentFixture<MealTableDeleteDialogComponent>;
        let service: MealTableService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [MealTableDeleteDialogComponent]
            })
                .overrideTemplate(MealTableDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MealTableDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MealTableService);
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
