/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SeekTestModule } from '../../../test.module';
import { RestaurantTypeComponent } from 'app/entities/restaurant-type/restaurant-type.component';
import { RestaurantTypeService } from 'app/entities/restaurant-type/restaurant-type.service';
import { RestaurantType } from 'app/shared/model/restaurant-type.model';

describe('Component Tests', () => {
    describe('RestaurantType Management Component', () => {
        let comp: RestaurantTypeComponent;
        let fixture: ComponentFixture<RestaurantTypeComponent>;
        let service: RestaurantTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [RestaurantTypeComponent],
                providers: []
            })
                .overrideTemplate(RestaurantTypeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RestaurantTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RestaurantTypeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new RestaurantType(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.restaurantTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
