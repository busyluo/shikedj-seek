/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SeekTestModule } from '../../../test.module';
import { SealedBonusDetailComponent } from 'app/entities/sealed-bonus/sealed-bonus-detail.component';
import { SealedBonus } from 'app/shared/model/sealed-bonus.model';

describe('Component Tests', () => {
    describe('SealedBonus Management Detail Component', () => {
        let comp: SealedBonusDetailComponent;
        let fixture: ComponentFixture<SealedBonusDetailComponent>;
        const route = ({ data: of({ sealedBonus: new SealedBonus(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [SealedBonusDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SealedBonusDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SealedBonusDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.sealedBonus).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
