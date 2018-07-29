/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SeekTestModule } from '../../../test.module';
import { AgentAreaDeleteDialogComponent } from 'app/entities/agent-area/agent-area-delete-dialog.component';
import { AgentAreaService } from 'app/entities/agent-area/agent-area.service';

describe('Component Tests', () => {
    describe('AgentArea Management Delete Component', () => {
        let comp: AgentAreaDeleteDialogComponent;
        let fixture: ComponentFixture<AgentAreaDeleteDialogComponent>;
        let service: AgentAreaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [AgentAreaDeleteDialogComponent]
            })
                .overrideTemplate(AgentAreaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AgentAreaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AgentAreaService);
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
