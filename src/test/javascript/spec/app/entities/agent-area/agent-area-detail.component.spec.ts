/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SeekTestModule } from '../../../test.module';
import { AgentAreaDetailComponent } from 'app/entities/agent-area/agent-area-detail.component';
import { AgentArea } from 'app/shared/model/agent-area.model';

describe('Component Tests', () => {
    describe('AgentArea Management Detail Component', () => {
        let comp: AgentAreaDetailComponent;
        let fixture: ComponentFixture<AgentAreaDetailComponent>;
        const route = ({ data: of({ agentArea: new AgentArea(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [AgentAreaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AgentAreaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AgentAreaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.agentArea).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
