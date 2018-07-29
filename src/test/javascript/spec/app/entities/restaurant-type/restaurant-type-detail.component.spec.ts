/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SeekTestModule } from '../../../test.module';
import { RestaurantTypeDetailComponent } from 'app/entities/restaurant-type/restaurant-type-detail.component';
import { RestaurantType } from 'app/shared/model/restaurant-type.model';

describe('Component Tests', () => {
    describe('RestaurantType Management Detail Component', () => {
        let comp: RestaurantTypeDetailComponent;
        let fixture: ComponentFixture<RestaurantTypeDetailComponent>;
        const route = ({ data: of({ restaurantType: new RestaurantType(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [RestaurantTypeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RestaurantTypeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RestaurantTypeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.restaurantType).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
