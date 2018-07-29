/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SeekTestModule } from '../../../test.module';
import { BankTransferUpdateComponent } from 'app/entities/bank-transfer/bank-transfer-update.component';
import { BankTransferService } from 'app/entities/bank-transfer/bank-transfer.service';
import { BankTransfer } from 'app/shared/model/bank-transfer.model';

describe('Component Tests', () => {
    describe('BankTransfer Management Update Component', () => {
        let comp: BankTransferUpdateComponent;
        let fixture: ComponentFixture<BankTransferUpdateComponent>;
        let service: BankTransferService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [BankTransferUpdateComponent]
            })
                .overrideTemplate(BankTransferUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BankTransferUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BankTransferService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BankTransfer(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.bankTransfer = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BankTransfer();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.bankTransfer = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
