/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SeekTestModule } from '../../../test.module';
import { BonusPoolDetailComponent } from 'app/entities/bonus-pool/bonus-pool-detail.component';
import { BonusPool } from 'app/shared/model/bonus-pool.model';

describe('Component Tests', () => {
    describe('BonusPool Management Detail Component', () => {
        let comp: BonusPoolDetailComponent;
        let fixture: ComponentFixture<BonusPoolDetailComponent>;
        const route = ({ data: of({ bonusPool: new BonusPool(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [BonusPoolDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(BonusPoolDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BonusPoolDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.bonusPool).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
