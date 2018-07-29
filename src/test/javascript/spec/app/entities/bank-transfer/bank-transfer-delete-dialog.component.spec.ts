/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SeekTestModule } from '../../../test.module';
import { BankTransferDeleteDialogComponent } from 'app/entities/bank-transfer/bank-transfer-delete-dialog.component';
import { BankTransferService } from 'app/entities/bank-transfer/bank-transfer.service';

describe('Component Tests', () => {
    describe('BankTransfer Management Delete Component', () => {
        let comp: BankTransferDeleteDialogComponent;
        let fixture: ComponentFixture<BankTransferDeleteDialogComponent>;
        let service: BankTransferService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [BankTransferDeleteDialogComponent]
            })
                .overrideTemplate(BankTransferDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BankTransferDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BankTransferService);
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
