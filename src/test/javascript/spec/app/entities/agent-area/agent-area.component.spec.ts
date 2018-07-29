/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SeekTestModule } from '../../../test.module';
import { AgentAreaComponent } from 'app/entities/agent-area/agent-area.component';
import { AgentAreaService } from 'app/entities/agent-area/agent-area.service';
import { AgentArea } from 'app/shared/model/agent-area.model';

describe('Component Tests', () => {
    describe('AgentArea Management Component', () => {
        let comp: AgentAreaComponent;
        let fixture: ComponentFixture<AgentAreaComponent>;
        let service: AgentAreaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [AgentAreaComponent],
                providers: []
            })
                .overrideTemplate(AgentAreaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AgentAreaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AgentAreaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AgentArea(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.agentAreas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
