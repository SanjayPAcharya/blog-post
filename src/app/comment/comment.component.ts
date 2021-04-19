import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Comment, CommentService } from 'src/services/comment.service';
import { AvatarGenerator } from 'random-avatar-generator';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input('comment') comment: Comment;
  @Input('rootNode') rootNode: Array<Comment>;
  @Output('saveToParent') saveToParent = new EventEmitter<any>();
  @Output('updateServiceStore') updateServiceStore = new EventEmitter<any>();

  @ViewChild('textarea') textarea: any;
  @ViewChild('replyArea') replyArea: any;

  avtar: string;
  generator: any;

  constructor() { }

  ngOnInit(): void {
    this.generator = new AvatarGenerator();
    this.avtar = this.generator.generateRandomAvatar();
  }

  openReplyWindow(block) {
    block.enableReplyBox = true;
    setTimeout(() => {
      this.replyArea.nativeElement.focus();
    }, 100);
  }

  saveUnderNode(block, val) {
    block.enableReplyBox = false;
    block.replies.push({
      author: 'Sanjay',
      time: new Date().toDateString(),
      text: val,
      likes: 0,
      dislikes: 0,
      disliked: false,
      liked: false,
      replies: []
    });
    this.updateStore();
  }

  onComment(textarea) {
    this.saveToParent.emit({
      author: 'Sanjay',
      time: new Date().toDateString(),
      text: textarea.value,
      likes: 0,
      dislikes: 0,
      disliked: false,
      liked: false,
      replies: []
    });
    textarea.value = "";
    this.updateStore();
  }

  onDisLike(block) {
    if (!block.disliked) {
      ++block.dislikes;
      if (block.liked) {
        --block.likes;
        block.liked = false;
      };
      block.disliked = true;
    };
    this.updateStore();
  }

  onLike(block) {
    if (!block.liked) {
      ++block.likes;
      if (block.disliked) {
        --block.dislikes;
        block.disliked = false;
      };
      block.liked = true;
    }
    this.updateStore();
  }

  updateStore() {
    this.updateServiceStore.emit();
  }
}
