import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import {GraphComponent} from './graphs/graph.component';
import {HomeComponent} from './home/home.component';
import {NewgraphComponent} from './newgraph/newgraph.component';
import {WeatherComponent} from './weather/weather.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: '', component: WeatherComponent},
  { path: 'posts', component: PostListComponent },
  { path: 'graph', component: GraphComponent },
  {path: 'newgraph', component: NewgraphComponent},
  { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
