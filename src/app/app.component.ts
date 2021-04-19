import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Comment, CommentService } from 'src/services/comment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  comments: Array<Comment> = [];

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    this.comments = this.commentService.get_From_LocalStorage() || [];
  }

  addComment(data: any) {
    this.comments.push(data);
  }

  updateStore() {
    this.commentService.store_In_LocalStorage(this.comments);
  }

  clear() {
    this.commentService.store_In_LocalStorage(null);
  }
}
