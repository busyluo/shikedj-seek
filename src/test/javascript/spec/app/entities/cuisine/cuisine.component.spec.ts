/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SeekTestModule } from '../../../test.module';
import { CuisineComponent } from 'app/entities/cuisine/cuisine.component';
import { CuisineService } from 'app/entities/cuisine/cuisine.service';
import { Cuisine } from 'app/shared/model/cuisine.model';

describe('Component Tests', () => {
    describe('Cuisine Management Component', () => {
        let comp: CuisineComponent;
        let fixture: ComponentFixture<CuisineComponent>;
        let service: CuisineService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [CuisineComponent],
                providers: []
            })
                .overrideTemplate(CuisineComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CuisineComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CuisineService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Cuisine(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.cuisines[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
