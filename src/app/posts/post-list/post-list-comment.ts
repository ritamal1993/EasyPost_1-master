import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'CommentListPipe'})
export class CommentListPipe implements PipeTransform {
  transform(comments: any[], filter: string): any[] {
    if (!comments || !filter) {
      return comments;
    }
    return comments.filter(comment =>
      comment.postId.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  }
}
