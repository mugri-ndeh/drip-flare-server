import { PostDto } from "../dto/PostDto";
import AppLocation from "../models/Location";
import Post from "../models/Post";

export default interface IPostService {
  createPost(postRequestDto: PostDto): Promise<Post>;

  updatePost(post: Post, postDto: PostDto): Promise<Post>;

  getPostByProperty(property: any): Promise<Post>;

  getPostByUser(id: string): Promise<Post[]>;

  getPostByBusiness(id: string): Promise<Post[]>;

  getPostByLocation(location: AppLocation): Promise<Post[]>;

  getAllPosts(): Promise<Post[]>;

  deletePost(Post: Post): Promise<void>;
}
