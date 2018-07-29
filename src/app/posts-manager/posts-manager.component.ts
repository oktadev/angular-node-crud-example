import { Component, OnInit } from '@angular/core';
import { sortBy } from 'lodash';

import { Post } from './post';
import { PostAPIService } from './post-api.service';

@Component({
  selector: 'app-posts-manager',
  templateUrl: './posts-manager.component.html',
  styleUrls: ['./posts-manager.component.css']
})
export class PostsManagerComponent implements OnInit {
  posts: Post[] = [];

  constructor(public api: PostAPIService) { }

  async ngOnInit() {
    this.posts = (await this.api.getPosts()).map(data => new Post(data, this));
  }

  get newIsOpen() {
    const newPost = this.posts.find(post => !post.id);
    return !!(newPost && newPost.open);
  }

  addPost() {
    let newPost = this.posts.find(post => !post.id);

    if (!newPost) {
      newPost = new Post({}, this);
      this.posts.unshift(newPost);
    }

    newPost.open = true;
  }

  get sortedPosts() {
    return sortBy(this.posts, ['updatedAt']).reverse();
  }
}
