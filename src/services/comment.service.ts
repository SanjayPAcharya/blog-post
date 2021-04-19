import { Injectable } from '@angular/core';

export interface Comment {
  author: string,
  time: string,
  text: string
  replies: Array<Comment>,
  likes: number,
  dislikes: boolean,
  disliked: boolean,
  liked: boolean,
  enableReplyBox?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor() { }

  store_In_LocalStorage(data: Object) {
    localStorage.setItem("CommentsThread", data ? JSON.stringify(data) : null);
  }

  get_From_LocalStorage() {
    let data: string;
    data = localStorage.getItem("CommentsThread");
    return data ? JSON.parse(data) : [];
  }
}
