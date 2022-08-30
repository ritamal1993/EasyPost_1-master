import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { PostsService } from '../posts.service';
import {Post} from '../post.model';
import {Comment} from './comment.model';
import { Router } from '@angular/router';

import {mimeType} from '../post-create/mime-type.validator';
import {ActivatedRoute} from '@angular/router';
const BayesClassifier = require('bayes-classifier');

const classifier = new BayesClassifier();

declare const feather: any;

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  isLoading = false;
  form: FormGroup;
  private mode = 'create';
  private commentId: string;
  commentsPerPost: any;
  @Input() postId: string;
  constructor( public postsService: PostsService,
               private http: HttpClient,
               private activeRouter: ActivatedRoute,
               private router: Router) {}



  // tslint:disable-next-line:no-output-on-prefix
  // @Output() onSendMessage: EventEmitter<Comment> = new EventEmitter();



  comment = {
    postId: '',
    comment: '',
    commentUser: '',
    commentType: '',
    publishDate: ''
  };



  addComment() {
    if (this.form.invalid) {
      return;
    }
    this.comment.commentType = classifier.getClassifications(this.comment.comment)[0].label;
    console.log(this.comment.commentType);
    this.postsService.addComment(
      this.postId,
      this.comment.comment,
      this.comment.commentUser,
      this.comment.commentType,
      this.comment.publishDate
    );
    window.location.href = '/posts';
    this.form.reset();
  }

  onSaveComment() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
  }

  goToPost() {
    this.router.navigate(['/posts']);
    console.log(this.router);
  }


  ngOnInit() {
    feather.replace();
    console.log(this.postId);
    this.postsService.getCommentsByPostId(this.postId).subscribe(comments => {
      this.commentsPerPost = comments.comments;
    });

    this.form = new FormGroup({
      postId: new FormControl(null, {}),
      comment: new FormControl(null, {}),
      commentUser: new FormControl(null, {}),
      commentType: new FormControl(null, {})
    });


    const positiveDocuments = [
      'amazing, awesome movie!! Yeah!! Oh boy.',
      'Sweet, this is incredibly, amazing, perfect, great!!',
      'joy, interest',
      'love it',
      'You are braver than you believe, stronger than you seem and smarter than you think.',
      'You attract what you are, not what you want. If you want great, then be great.'
    ];

    const negativeDocuments = [
      'terrible, shitty thing. Damn. Sucks!!',
      'horrible, ugly, fuck, bad',
      'worst, shit, horrible'
    ];

    classifier.addDocuments(positiveDocuments, 'positive');
    classifier.addDocuments(negativeDocuments, 'negative');

    classifier.train();

  }

}
