/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SeekTestModule } from '../../../test.module';
import { SealedBonusDeleteDialogComponent } from 'app/entities/sealed-bonus/sealed-bonus-delete-dialog.component';
import { SealedBonusService } from 'app/entities/sealed-bonus/sealed-bonus.service';

describe('Component Tests', () => {
    describe('SealedBonus Management Delete Component', () => {
        let comp: SealedBonusDeleteDialogComponent;
        let fixture: ComponentFixture<SealedBonusDeleteDialogComponent>;
        let service: SealedBonusService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [SealedBonusDeleteDialogComponent]
            })
                .overrideTemplate(SealedBonusDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SealedBonusDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SealedBonusService);
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
