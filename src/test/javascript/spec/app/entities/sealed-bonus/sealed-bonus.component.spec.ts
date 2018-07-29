/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SeekTestModule } from '../../../test.module';
import { SealedBonusComponent } from 'app/entities/sealed-bonus/sealed-bonus.component';
import { SealedBonusService } from 'app/entities/sealed-bonus/sealed-bonus.service';
import { SealedBonus } from 'app/shared/model/sealed-bonus.model';

describe('Component Tests', () => {
    describe('SealedBonus Management Component', () => {
        let comp: SealedBonusComponent;
        let fixture: ComponentFixture<SealedBonusComponent>;
        let service: SealedBonusService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [SealedBonusComponent],
                providers: []
            })
                .overrideTemplate(SealedBonusComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SealedBonusComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SealedBonusService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new SealedBonus(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.sealedBonuses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
