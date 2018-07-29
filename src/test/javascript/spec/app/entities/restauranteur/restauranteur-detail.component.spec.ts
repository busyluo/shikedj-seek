/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SeekTestModule } from '../../../test.module';
import { RestauranteurDetailComponent } from 'app/entities/restauranteur/restauranteur-detail.component';
import { Restauranteur } from 'app/shared/model/restauranteur.model';

describe('Component Tests', () => {
    describe('Restauranteur Management Detail Component', () => {
        let comp: RestauranteurDetailComponent;
        let fixture: ComponentFixture<RestauranteurDetailComponent>;
        const route = ({ data: of({ restauranteur: new Restauranteur(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [RestauranteurDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RestauranteurDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RestauranteurDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.restauranteur).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
