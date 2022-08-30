import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { AngularMaterialModule } from '../angular-material.module';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {BrowserModule} from '@angular/platform-browser';
import {CommentComponent} from './comment/comment.component';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {PostContentFilterPipe} from './post-content-filter-pipe';
import {PostImageFilter} from './post-image-filter';
import {PostTitleFilterPipe} from './posts-filter.pipe';
import {MatCheckboxModule, MatListModule, MatSidenavModule} from '@angular/material';
import {CommentListPipe} from './post-list/post-list-comment';
import {JwSocialButtonsModule} from 'jw-angular-social-buttons';


@NgModule({
    declarations: [PostCreateComponent, PostListComponent, CommentComponent, PostContentFilterPipe,
      PostImageFilter, PostTitleFilterPipe, CommentListPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    FormsModule,
    Ng2SearchPipeModule,
    BrowserModule,
    AngularMultiSelectModule,
    MatCheckboxModule,
    MatListModule,
    MatSidenavModule,
    JwSocialButtonsModule
  ]
})
export class PostsModule {}
