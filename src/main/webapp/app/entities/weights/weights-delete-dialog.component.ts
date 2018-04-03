import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Weights } from './weights.model';
import { WeightsPopupService } from './weights-popup.service';
import { WeightsService } from './weights.service';

@Component({
    selector: 'jhi-weights-delete-dialog',
    templateUrl: './weights-delete-dialog.component.html'
})
export class WeightsDeleteDialogComponent {

    weights: Weights;

    constructor(
        private weightsService: WeightsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.weightsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'weightsListModification',
                content: 'Deleted an weights'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-weights-delete-popup',
    template: ''
})
export class WeightsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private weightsPopupService: WeightsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.weightsPopupService
                .open(WeightsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
