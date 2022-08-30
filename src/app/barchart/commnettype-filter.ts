import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'CommentTypeFilterPipe'})
export class CommentTypeFilterPipe implements PipeTransform {
  transform(comments: any[], filter: string): any[] {
    if (!comments || !filter) {
      return comments;
    }
    return comments.filter(comment =>
      comment.commentType.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  }
}
