/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SeekTestModule } from '../../../test.module';
import { BankTransferDetailComponent } from 'app/entities/bank-transfer/bank-transfer-detail.component';
import { BankTransfer } from 'app/shared/model/bank-transfer.model';

describe('Component Tests', () => {
    describe('BankTransfer Management Detail Component', () => {
        let comp: BankTransferDetailComponent;
        let fixture: ComponentFixture<BankTransferDetailComponent>;
        const route = ({ data: of({ bankTransfer: new BankTransfer(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [BankTransferDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(BankTransferDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BankTransferDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.bankTransfer).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
