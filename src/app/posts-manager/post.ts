import * as moment from 'moment';

import { PostData } from './post-data';
import { PostsManagerComponent } from './posts-manager.component';

export class Post implements PostData {
  loading = false;
  open = false;

  id: number;
  title: string;
  body: string;
  updatedAt: string;

  constructor(private data: PostData, private manager: PostsManagerComponent) {
    Object.assign(this, this.data);
  }

  get updatedAtString(): string {
    const { updatedAt } = this;
    return updatedAt ? `Updated ${moment(updatedAt).fromNow()}` : '';
  }

  get isDirty(): boolean {
    return (
      this.data.title !== this.title ||
      this.data.body !== this.body
    );
  }

  toJSON() {
    return this.serialize();
  }

  serialize(data: Post | PostData = this) {
    const { id, title, body, updatedAt } = data;
    return { id, title, body, updatedAt };
  }

  async save() {
    this.loading = true;

    const data = await this.manager.api.savePost(this);

    if (data) {
      Object.assign(this.data, data);
      Object.assign(this, data);
    }

    this.loading = false;
  }

  async delete() {
    this.loading = true;

    if (await this.manager.api.deletePost(this)) {
      this.manager.posts.splice(this.manager.posts.indexOf(this), 1);
    }

    this.loading = false;
  }

  reset() {
    Object.assign(this, this.serialize(this.data));
  }
}
