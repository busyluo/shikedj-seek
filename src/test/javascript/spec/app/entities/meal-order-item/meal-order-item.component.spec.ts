/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SeekTestModule } from '../../../test.module';
import { MealOrderItemComponent } from 'app/entities/meal-order-item/meal-order-item.component';
import { MealOrderItemService } from 'app/entities/meal-order-item/meal-order-item.service';
import { MealOrderItem } from 'app/shared/model/meal-order-item.model';

describe('Component Tests', () => {
    describe('MealOrderItem Management Component', () => {
        let comp: MealOrderItemComponent;
        let fixture: ComponentFixture<MealOrderItemComponent>;
        let service: MealOrderItemService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [MealOrderItemComponent],
                providers: []
            })
                .overrideTemplate(MealOrderItemComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MealOrderItemComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MealOrderItemService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MealOrderItem(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.mealOrderItems[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
