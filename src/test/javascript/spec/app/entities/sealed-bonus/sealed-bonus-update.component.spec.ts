/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SeekTestModule } from '../../../test.module';
import { SealedBonusUpdateComponent } from 'app/entities/sealed-bonus/sealed-bonus-update.component';
import { SealedBonusService } from 'app/entities/sealed-bonus/sealed-bonus.service';
import { SealedBonus } from 'app/shared/model/sealed-bonus.model';

describe('Component Tests', () => {
    describe('SealedBonus Management Update Component', () => {
        let comp: SealedBonusUpdateComponent;
        let fixture: ComponentFixture<SealedBonusUpdateComponent>;
        let service: SealedBonusService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [SealedBonusUpdateComponent]
            })
                .overrideTemplate(SealedBonusUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SealedBonusUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SealedBonusService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SealedBonus(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.sealedBonus = entity;
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
                    const entity = new SealedBonus();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.sealedBonus = entity;
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
