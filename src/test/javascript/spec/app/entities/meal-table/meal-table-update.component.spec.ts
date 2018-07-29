/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SeekTestModule } from '../../../test.module';
import { MealTableUpdateComponent } from 'app/entities/meal-table/meal-table-update.component';
import { MealTableService } from 'app/entities/meal-table/meal-table.service';
import { MealTable } from 'app/shared/model/meal-table.model';

describe('Component Tests', () => {
    describe('MealTable Management Update Component', () => {
        let comp: MealTableUpdateComponent;
        let fixture: ComponentFixture<MealTableUpdateComponent>;
        let service: MealTableService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [MealTableUpdateComponent]
            })
                .overrideTemplate(MealTableUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MealTableUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MealTableService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MealTable(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.mealTable = entity;
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
                    const entity = new MealTable();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.mealTable = entity;
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
