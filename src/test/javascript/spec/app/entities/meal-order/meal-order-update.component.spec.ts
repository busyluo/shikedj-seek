/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SeekTestModule } from '../../../test.module';
import { MealOrderUpdateComponent } from 'app/entities/meal-order/meal-order-update.component';
import { MealOrderService } from 'app/entities/meal-order/meal-order.service';
import { MealOrder } from 'app/shared/model/meal-order.model';

describe('Component Tests', () => {
    describe('MealOrder Management Update Component', () => {
        let comp: MealOrderUpdateComponent;
        let fixture: ComponentFixture<MealOrderUpdateComponent>;
        let service: MealOrderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [MealOrderUpdateComponent]
            })
                .overrideTemplate(MealOrderUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MealOrderUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MealOrderService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MealOrder(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.mealOrder = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MealOrder();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.mealOrder = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
