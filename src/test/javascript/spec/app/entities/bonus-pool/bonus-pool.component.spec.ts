/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SeekTestModule } from '../../../test.module';
import { BonusPoolComponent } from 'app/entities/bonus-pool/bonus-pool.component';
import { BonusPoolService } from 'app/entities/bonus-pool/bonus-pool.service';
import { BonusPool } from 'app/shared/model/bonus-pool.model';

describe('Component Tests', () => {
    describe('BonusPool Management Component', () => {
        let comp: BonusPoolComponent;
        let fixture: ComponentFixture<BonusPoolComponent>;
        let service: BonusPoolService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [BonusPoolComponent],
                providers: []
            })
                .overrideTemplate(BonusPoolComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BonusPoolComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BonusPoolService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new BonusPool(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.bonusPools[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
