import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { PostsComponent } from './components/posts/posts.component';
import { DetailsComponent } from './components/details/details.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { PhotosComponent } from './components/photos/photos.component';
import { CommentsComponent } from './components/comments/comments.component';
import { CatalogsComponent } from './components/catalogs/catalogs.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: 'newuser',
    component: UserAddComponent
  },
  {
    path: 'details/:id',
    component: DetailsComponent
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  {
    path: 'albums',
    component: AlbumsComponent
  },
  {
    path: 'photos',
    component: PhotosComponent
  },
  {
    path: 'comments/:id',
    component: CommentsComponent
  },
  {
    path: 'catalogs',
    component: CatalogsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
