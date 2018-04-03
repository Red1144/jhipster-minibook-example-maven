import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { WeightsComponent } from './weights.component';
import { WeightsDetailComponent } from './weights-detail.component';
import { WeightsPopupComponent } from './weights-dialog.component';
import { WeightsDeletePopupComponent } from './weights-delete-dialog.component';

@Injectable()
export class WeightsResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const weightsRoute: Routes = [
    {
        path: 'weights',
        component: WeightsComponent,
        resolve: {
            'pagingParams': WeightsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyOnePointsApp.weights.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'weights/:id',
        component: WeightsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyOnePointsApp.weights.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const weightsPopupRoute: Routes = [
    {
        path: 'weights-new',
        component: WeightsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyOnePointsApp.weights.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'weights/:id/edit',
        component: WeightsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyOnePointsApp.weights.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'weights/:id/delete',
        component: WeightsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyOnePointsApp.weights.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
