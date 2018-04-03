import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Weights } from './weights.model';
import { WeightsService } from './weights.service';

@Component({
    selector: 'jhi-weights-detail',
    templateUrl: './weights-detail.component.html'
})
export class WeightsDetailComponent implements OnInit, OnDestroy {

    weights: Weights;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private weightsService: WeightsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInWeights();
    }

    load(id) {
        this.weightsService.find(id)
            .subscribe((weightsResponse: HttpResponse<Weights>) => {
                this.weights = weightsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInWeights() {
        this.eventSubscriber = this.eventManager.subscribe(
            'weightsListModification',
            (response) => this.load(this.weights.id)
        );
    }
}
