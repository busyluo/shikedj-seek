/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SeekTestModule } from '../../../test.module';
import { AgentProvinceDeleteDialogComponent } from 'app/entities/agent-province/agent-province-delete-dialog.component';
import { AgentProvinceService } from 'app/entities/agent-province/agent-province.service';

describe('Component Tests', () => {
    describe('AgentProvince Management Delete Component', () => {
        let comp: AgentProvinceDeleteDialogComponent;
        let fixture: ComponentFixture<AgentProvinceDeleteDialogComponent>;
        let service: AgentProvinceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [AgentProvinceDeleteDialogComponent]
            })
                .overrideTemplate(AgentProvinceDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AgentProvinceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AgentProvinceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
