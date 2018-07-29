/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SeekTestModule } from '../../../test.module';
import { RestauranteurComponent } from 'app/entities/restauranteur/restauranteur.component';
import { RestauranteurService } from 'app/entities/restauranteur/restauranteur.service';
import { Restauranteur } from 'app/shared/model/restauranteur.model';

describe('Component Tests', () => {
    describe('Restauranteur Management Component', () => {
        let comp: RestauranteurComponent;
        let fixture: ComponentFixture<RestauranteurComponent>;
        let service: RestauranteurService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [RestauranteurComponent],
                providers: []
            })
                .overrideTemplate(RestauranteurComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RestauranteurComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RestauranteurService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Restauranteur(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.restauranteurs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
