/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SeekTestModule } from '../../../test.module';
import { RestauranteurUpdateComponent } from 'app/entities/restauranteur/restauranteur-update.component';
import { RestauranteurService } from 'app/entities/restauranteur/restauranteur.service';
import { Restauranteur } from 'app/shared/model/restauranteur.model';

describe('Component Tests', () => {
    describe('Restauranteur Management Update Component', () => {
        let comp: RestauranteurUpdateComponent;
        let fixture: ComponentFixture<RestauranteurUpdateComponent>;
        let service: RestauranteurService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [RestauranteurUpdateComponent]
            })
                .overrideTemplate(RestauranteurUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RestauranteurUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RestauranteurService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Restauranteur(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.restauranteur = entity;
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
                    const entity = new Restauranteur();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.restauranteur = entity;
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
