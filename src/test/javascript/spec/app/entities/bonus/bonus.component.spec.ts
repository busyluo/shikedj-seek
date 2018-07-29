/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SeekTestModule } from '../../../test.module';
import { BonusComponent } from 'app/entities/bonus/bonus.component';
import { BonusService } from 'app/entities/bonus/bonus.service';
import { Bonus } from 'app/shared/model/bonus.model';

describe('Component Tests', () => {
    describe('Bonus Management Component', () => {
        let comp: BonusComponent;
        let fixture: ComponentFixture<BonusComponent>;
        let service: BonusService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [BonusComponent],
                providers: []
            })
                .overrideTemplate(BonusComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BonusComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BonusService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Bonus(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.bonuses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
