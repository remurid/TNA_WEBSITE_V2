import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ServicesComponent } from './pages/services/services.component';
import { TeamsComponent } from './pages/teams/teams.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'blogs',
        component: BlogsComponent
    },
    {
        path: 'contact-us',
        component: ContactUsComponent
    },
    {
        path: 'services',
        component: ServicesComponent
    },
    {
        path: 'teams',
        component: TeamsComponent
    },
];
