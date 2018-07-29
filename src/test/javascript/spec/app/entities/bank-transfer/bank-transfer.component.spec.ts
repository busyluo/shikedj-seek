/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SeekTestModule } from '../../../test.module';
import { BankTransferComponent } from 'app/entities/bank-transfer/bank-transfer.component';
import { BankTransferService } from 'app/entities/bank-transfer/bank-transfer.service';
import { BankTransfer } from 'app/shared/model/bank-transfer.model';

describe('Component Tests', () => {
    describe('BankTransfer Management Component', () => {
        let comp: BankTransferComponent;
        let fixture: ComponentFixture<BankTransferComponent>;
        let service: BankTransferService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [BankTransferComponent],
                providers: []
            })
                .overrideTemplate(BankTransferComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BankTransferComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BankTransferService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new BankTransfer(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.bankTransfers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
