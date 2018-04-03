import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Preference } from './preference.model';
import { PreferenceService } from './preference.service';

@Component({
    selector: 'jhi-preference-detail',
    templateUrl: './preference-detail.component.html'
})
export class PreferenceDetailComponent implements OnInit, OnDestroy {

    preference: Preference;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private preferenceService: PreferenceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPreferences();
    }

    load(id) {
        this.preferenceService.find(id)
            .subscribe((preferenceResponse: HttpResponse<Preference>) => {
                this.preference = preferenceResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPreferences() {
        this.eventSubscriber = this.eventManager.subscribe(
            'preferenceListModification',
            (response) => this.load(this.preference.id)
        );
    }
}
