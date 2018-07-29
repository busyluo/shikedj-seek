/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SeekTestModule } from '../../../test.module';
import { AgentAreaUpdateComponent } from 'app/entities/agent-area/agent-area-update.component';
import { AgentAreaService } from 'app/entities/agent-area/agent-area.service';
import { AgentArea } from 'app/shared/model/agent-area.model';

describe('Component Tests', () => {
    describe('AgentArea Management Update Component', () => {
        let comp: AgentAreaUpdateComponent;
        let fixture: ComponentFixture<AgentAreaUpdateComponent>;
        let service: AgentAreaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [AgentAreaUpdateComponent]
            })
                .overrideTemplate(AgentAreaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AgentAreaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AgentAreaService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AgentArea(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.agentArea = entity;
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
                    const entity = new AgentArea();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.agentArea = entity;
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
