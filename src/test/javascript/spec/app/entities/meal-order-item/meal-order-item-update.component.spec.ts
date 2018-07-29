/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SeekTestModule } from '../../../test.module';
import { MealOrderItemUpdateComponent } from 'app/entities/meal-order-item/meal-order-item-update.component';
import { MealOrderItemService } from 'app/entities/meal-order-item/meal-order-item.service';
import { MealOrderItem } from 'app/shared/model/meal-order-item.model';

describe('Component Tests', () => {
    describe('MealOrderItem Management Update Component', () => {
        let comp: MealOrderItemUpdateComponent;
        let fixture: ComponentFixture<MealOrderItemUpdateComponent>;
        let service: MealOrderItemService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [MealOrderItemUpdateComponent]
            })
                .overrideTemplate(MealOrderItemUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MealOrderItemUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MealOrderItemService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MealOrderItem(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.mealOrderItem = entity;
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
                    const entity = new MealOrderItem();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.mealOrderItem = entity;
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
