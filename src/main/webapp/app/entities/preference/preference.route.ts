import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PreferenceComponent } from './preference.component';
import { PreferenceDetailComponent } from './preference-detail.component';
import { PreferencePopupComponent } from './preference-dialog.component';
import { PreferenceDeletePopupComponent } from './preference-delete-dialog.component';

@Injectable()
export class PreferenceResolvePagingParams implements Resolve<any> {

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

export const preferenceRoute: Routes = [
    {
        path: 'preference',
        component: PreferenceComponent,
        resolve: {
            'pagingParams': PreferenceResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyOnePointsApp.preference.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'preference/:id',
        component: PreferenceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyOnePointsApp.preference.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const preferencePopupRoute: Routes = [
    {
        path: 'preference-new',
        component: PreferencePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyOnePointsApp.preference.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'preference/:id/edit',
        component: PreferencePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyOnePointsApp.preference.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'preference/:id/delete',
        component: PreferenceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyOnePointsApp.preference.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
