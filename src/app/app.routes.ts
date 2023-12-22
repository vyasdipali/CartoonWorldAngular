import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddMoreComponent } from './components/add-more/add-more.component';
import { SingUpComponent } from './components/sing-up/sing-up.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './Common/auth.guard';
import { AppComponent } from './app.component';

export const routes: Routes = [
{
  path:"",
  component:AppComponent,
  children:[
    {
      path:"",
      redirectTo:"/SingUp",
      pathMatch:'full'
    }
  ]
},
  {
    path: 'home',
    component: HomeComponent,

  },
  {
    path: 'navbar',
    component: NavbarComponent,
  },
  {
    path: 'addMore',
    component: AddMoreComponent,

  },
  {
    path: 'SingUp',
    component: SingUpComponent,
  },
  {
    path: 'Login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
];
