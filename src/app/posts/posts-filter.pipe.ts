
import { PipeTransform, Pipe } from '@angular/core';
import { Post} from '../posts/post.model';

@Pipe({
  name: 'PostTitleFilter'
})
export class PostTitleFilterPipe implements PipeTransform {
  transform(posts: Post[], searchTerm: string): Post[] {
    if (!posts || !searchTerm) {
      return posts;
    }
    return posts.filter(post =>
    post.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }
}
