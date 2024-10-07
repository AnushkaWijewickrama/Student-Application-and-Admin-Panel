import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent

    },
    {
        path: 'dashboard',
        component: AdmindashboardComponent

    },

];
