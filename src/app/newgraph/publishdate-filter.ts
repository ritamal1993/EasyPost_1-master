import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'PublishDateFilter'})
export class PublishDateFilterPipe implements PipeTransform {
  transform(comments: any[], filter: string): any[] {
    if (!comments || !filter) {
      return comments;
    }
    return comments.filter(comment =>
      comment.publishDate.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  }
}
