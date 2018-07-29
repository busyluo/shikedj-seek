/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SeekTestModule } from '../../../test.module';
import { RestaurantTypeUpdateComponent } from 'app/entities/restaurant-type/restaurant-type-update.component';
import { RestaurantTypeService } from 'app/entities/restaurant-type/restaurant-type.service';
import { RestaurantType } from 'app/shared/model/restaurant-type.model';

describe('Component Tests', () => {
    describe('RestaurantType Management Update Component', () => {
        let comp: RestaurantTypeUpdateComponent;
        let fixture: ComponentFixture<RestaurantTypeUpdateComponent>;
        let service: RestaurantTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [RestaurantTypeUpdateComponent]
            })
                .overrideTemplate(RestaurantTypeUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RestaurantTypeUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RestaurantTypeService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new RestaurantType(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.restaurantType = entity;
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
                    const entity = new RestaurantType();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.restaurantType = entity;
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
