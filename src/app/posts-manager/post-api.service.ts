import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

import { environment } from '../../environments/environment';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostAPIService {
  constructor(private oktaAuth: OktaAuthService) { }

  private async fetch(method: string, endpoint: string, body?: any) {
    try {
      const response = await fetch(`${environment.api}${endpoint}`, {
        method,
        body: body && JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          authorization: `Bearer ${await this.oktaAuth.getAccessToken()}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async getPosts() {
    return (await this.fetch('get', '/posts')) || [];
  }

  async savePost(post: Post) {
    return post.id
      ? this.fetch('put', `/posts/${post.id}`, post)
      : this.fetch('post', '/posts', post);
  }

  async deletePost(post: Post) {
    if (window.confirm(`Are you sure you want to delete "${post.title}"`)) {
      await this.fetch('delete', `/posts/${post.id}`);
      return true;
    }

    return false;
  }
}
