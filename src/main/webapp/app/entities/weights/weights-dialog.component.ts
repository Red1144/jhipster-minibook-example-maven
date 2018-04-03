import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Weights } from './weights.model';
import { WeightsPopupService } from './weights-popup.service';
import { WeightsService } from './weights.service';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-weights-dialog',
    templateUrl: './weights-dialog.component.html'
})
export class WeightsDialogComponent implements OnInit {

    weights: Weights;
    isSaving: boolean;

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private weightsService: WeightsService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.weights.id !== undefined) {
            this.subscribeToSaveResponse(
                this.weightsService.update(this.weights));
        } else {
            this.subscribeToSaveResponse(
                this.weightsService.create(this.weights));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Weights>>) {
        result.subscribe((res: HttpResponse<Weights>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Weights) {
        this.eventManager.broadcast({ name: 'weightsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-weights-popup',
    template: ''
})
export class WeightsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private weightsPopupService: WeightsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.weightsPopupService
                    .open(WeightsDialogComponent as Component, params['id']);
            } else {
                this.weightsPopupService
                    .open(WeightsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
