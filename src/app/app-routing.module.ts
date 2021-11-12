import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserResolver } from './resolvers/user.resolver';
import { UserComponent } from './user/user.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: 'user/:id', component: UserComponent,
    resolve: {
      userId: UserResolver,
    },
    children:[
      {path:'posts',
        loadChildren:() => import(`./posts/posts.module`).then(module => module.PostsModule)},
      {path:'details',
        loadChildren:() => import(`./user-details/user-details.module`).then(module => module.UserDetailsModule)},
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
