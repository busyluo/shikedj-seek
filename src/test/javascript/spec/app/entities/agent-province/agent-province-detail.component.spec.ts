/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SeekTestModule } from '../../../test.module';
import { AgentProvinceDetailComponent } from 'app/entities/agent-province/agent-province-detail.component';
import { AgentProvince } from 'app/shared/model/agent-province.model';

describe('Component Tests', () => {
    describe('AgentProvince Management Detail Component', () => {
        let comp: AgentProvinceDetailComponent;
        let fixture: ComponentFixture<AgentProvinceDetailComponent>;
        const route = ({ data: of({ agentProvince: new AgentProvince(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [AgentProvinceDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AgentProvinceDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AgentProvinceDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.agentProvince).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
