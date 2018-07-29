/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SeekTestModule } from '../../../test.module';
import { MealTableComponent } from 'app/entities/meal-table/meal-table.component';
import { MealTableService } from 'app/entities/meal-table/meal-table.service';
import { MealTable } from 'app/shared/model/meal-table.model';

describe('Component Tests', () => {
    describe('MealTable Management Component', () => {
        let comp: MealTableComponent;
        let fixture: ComponentFixture<MealTableComponent>;
        let service: MealTableService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [MealTableComponent],
                providers: []
            })
                .overrideTemplate(MealTableComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MealTableComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MealTableService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MealTable(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.mealTables[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
