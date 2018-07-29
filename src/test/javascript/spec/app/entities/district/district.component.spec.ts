/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SeekTestModule } from '../../../test.module';
import { DistrictComponent } from 'app/entities/district/district.component';
import { DistrictService } from 'app/entities/district/district.service';
import { District } from 'app/shared/model/district.model';

describe('Component Tests', () => {
    describe('District Management Component', () => {
        let comp: DistrictComponent;
        let fixture: ComponentFixture<DistrictComponent>;
        let service: DistrictService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [DistrictComponent],
                providers: []
            })
                .overrideTemplate(DistrictComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DistrictComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DistrictService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new District(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.districts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
