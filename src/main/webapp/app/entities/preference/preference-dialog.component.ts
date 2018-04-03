import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Preference } from './preference.model';
import { PreferencePopupService } from './preference-popup.service';
import { PreferenceService } from './preference.service';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-preference-dialog',
    templateUrl: './preference-dialog.component.html'
})
export class PreferenceDialogComponent implements OnInit {

    preference: Preference;
    isSaving: boolean;

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private preferenceService: PreferenceService,
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
        if (this.preference.id !== undefined) {
            this.subscribeToSaveResponse(
                this.preferenceService.update(this.preference));
        } else {
            this.subscribeToSaveResponse(
                this.preferenceService.create(this.preference));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Preference>>) {
        result.subscribe((res: HttpResponse<Preference>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Preference) {
        this.eventManager.broadcast({ name: 'preferenceListModification', content: 'OK'});
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
    selector: 'jhi-preference-popup',
    template: ''
})
export class PreferencePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private preferencePopupService: PreferencePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.preferencePopupService
                    .open(PreferenceDialogComponent as Component, params['id']);
            } else {
                this.preferencePopupService
                    .open(PreferenceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
