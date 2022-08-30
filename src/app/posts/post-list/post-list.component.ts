import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { AuthService } from '../../auth/auth.service';
import {$} from 'protractor';
import {Comment} from '../comment/comment.model';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  commentsPerPost: Comment[] = [];
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 3;
  currentPage = 1;
  pageSizeOptions = [1, 3, 7, this.totalPosts];
  userIsAuthenticated = false;
  userId: string;
  private postsSub: Subscription;
  private allPostsSub: Subscription;
  private authStatusSub: Subscription;
  image: boolean;
  postId;
  postTitle: string;
  postContent: string;
  postComment: string;
  searchText;
  title = 'Angular Search Using ng2-search-filter';
  itemList = [];
  selectedItems = [];
  settings = {};
  private commentSub: Subscription;
  comments: any;

  tempCount: number;
  data: any[];

  constructor(
    public postsService: PostsService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.postId = this.postsService.getPostId();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postData: { posts: Post[]; postCount: number }) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
    this.postsService.getAllComments().subscribe(c => {
      console.log();
      this.comments = c;
      this.commentPost();
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

  commentPost() {
    this.postsService.getCommentsByPostId('5e651d2bdf439b2d80097716').subscribe(comments => {
      console.log(comments);
      this.commentsPerPost = comments.comments;
    });
  }

}
