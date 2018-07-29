/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SeekTestModule } from '../../../test.module';
import { MealOrderItemDetailComponent } from 'app/entities/meal-order-item/meal-order-item-detail.component';
import { MealOrderItem } from 'app/shared/model/meal-order-item.model';

describe('Component Tests', () => {
    describe('MealOrderItem Management Detail Component', () => {
        let comp: MealOrderItemDetailComponent;
        let fixture: ComponentFixture<MealOrderItemDetailComponent>;
        const route = ({ data: of({ mealOrderItem: new MealOrderItem(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [MealOrderItemDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MealOrderItemDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MealOrderItemDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.mealOrderItem).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
