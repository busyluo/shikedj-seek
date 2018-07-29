/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SeekTestModule } from '../../../test.module';
import { MealOrderDetailComponent } from 'app/entities/meal-order/meal-order-detail.component';
import { MealOrder } from 'app/shared/model/meal-order.model';

describe('Component Tests', () => {
    describe('MealOrder Management Detail Component', () => {
        let comp: MealOrderDetailComponent;
        let fixture: ComponentFixture<MealOrderDetailComponent>;
        const route = ({ data: of({ mealOrder: new MealOrder(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [MealOrderDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MealOrderDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MealOrderDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.mealOrder).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
