import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Preference } from './preference.model';
import { PreferencePopupService } from './preference-popup.service';
import { PreferenceService } from './preference.service';

@Component({
    selector: 'jhi-preference-delete-dialog',
    templateUrl: './preference-delete-dialog.component.html'
})
export class PreferenceDeleteDialogComponent {

    preference: Preference;

    constructor(
        private preferenceService: PreferenceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.preferenceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'preferenceListModification',
                content: 'Deleted an preference'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-preference-delete-popup',
    template: ''
})
export class PreferenceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private preferencePopupService: PreferencePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.preferencePopupService
                .open(PreferenceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
