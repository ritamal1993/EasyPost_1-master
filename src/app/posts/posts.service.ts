import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { Post } from './post.model';
import { Comment } from './comment/comment.model';
import {AuthData} from '../auth/auth-data.model';

const BACKEND_URL = environment.apiUrl + '/posts/';
const BACKEND_URL_COMMENTS = environment.apiUrl + '/comments/';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postId: string;
  private allPosts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[]; postCount: number }>();
  private allPostsUpdated = new Subject<{ allPosts: Post[]; postCount: number }>();
  private commentsData: Comment[] = [];
  private commentsSatisiticsUpdate = new Subject<{ commetnsData: Comment[] }>();

  constructor(private http: HttpClient, private router: Router) {
  }

  getPostId() {
    this.postId = localStorage.getItem('postId');
    return this.postId;
  }

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        BACKEND_URL + '/page' + queryParams
      )
      .pipe(
        map(postData => {
          // console.log(postData);
          return {
            posts: postData.posts.map(post => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                imagePath: post.imagePath,
                creator: post.creator
              };
            }),
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });

  }

  getAllPosts() {
    this.http
      .get<{ posts: any }>(BACKEND_URL)
      .pipe(
        map(postData => {
          return {
            Posts: postData.posts.map(post => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                imagePath: post.imagePath,
                creator: post.creator
              };
            })
          };
        })
      );
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
      creator: string;
    }>(BACKEND_URL + id);
  }

  getPostByTitle(title: string) {
    return this.http.get<{ posts: any }>(BACKEND_URL + '/title/' + title);
  }

  getPostByContent(content: string) {
    return this.http.get<{ posts: any }>(BACKEND_URL + '/content/' + content);
  }

  getCommentsByPostId(postId: string) {
    return this.http.get<{ comments: any }>(BACKEND_URL_COMMENTS + postId);
    // return this.http.get<{comments: any}>(BACKEND_URL_COMMENTS + postId).pipe(
    //   map(commentsData => {
    //     return {
    //       comments: commentsData.comments.map(comment => {
    //         return {
    //           postId: comment.postId,
    //           comment: comment.postId,
    //           commentUser: comment.postId,
    //           publishDate: comment.postId,
    //         };
    //       }),
    //     };
    //   }));
  }

  getAllComments() {
    return this.http.get<{ comments: any }>(BACKEND_URL_COMMENTS);
  }

  getAllCommentsGraph() {
    return this.http
      .get<{ comments: any }>(BACKEND_URL_COMMENTS)
      .pipe(
        map(commentData => {
          return {
            Comments: commentData.comments.map(comment => {
              return {
                postId: comment.postId,
                comment: comment.comment,
                commentUser: comment.commentUser,
                publishDate: comment.publishDate,
                commentType: comment.commentType
              };
            })
          };
        })
      ).subscribe(transformedCommentData => {
        this.commentsData = transformedCommentData.Comments;
        this.commentsSatisiticsUpdate.next({commetnsData: [...this.commentsData]});
      });
  }


  staticsticGet() {
    return this.commentsSatisiticsUpdate.asObservable();
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
    this.http
      .post<{ message: string; post: Post }>(
        BACKEND_URL,
        postData
      )
      .subscribe(responseData => {
        this.router.navigate(['/']);
      });
  }

  addComment(postId: string, comment: string, commentUser: string, commentType: string, publishDate: string) {
    const commentData: Comment = {
      postId: postId, comment: comment, commentUser: commentUser, commentType: commentType, publishDate: publishDate };
    console.log(commentData);
    this.http.post(BACKEND_URL_COMMENTS, commentData).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      error => {
        console.log(error);
      }
    );

  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
        creator: null
      };
    }
    this.http
      .put(BACKEND_URL + id, postData)
      .subscribe(response => {
        this.router.navigate(['/']);
      });
  }

  deletePost(postId: string) {
    return this.http.delete(BACKEND_URL + postId);
  }
}
