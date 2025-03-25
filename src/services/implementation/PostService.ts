import { injectable, inject } from "inversify";
import { IOC } from "../../config/inversify/inversify.ioc.types";
import IPostService from "../IPostService";
import IPostRepository from "../IPostService";
import { PostDto } from "../../dto/PostDto";
import AppLocation from "../../models/Location";
import Post from "../../models/Post";

@injectable()
export default class PostService implements IPostService {
  private readonly iPostRepository: IPostRepository;

  constructor(@inject(IOC.IPostRepository) PostRepository: IPostRepository) {
    this.iPostRepository = PostRepository;
  }
  createPost(postRequestDto: PostDto): Promise<Post> {
    throw new Error("Method not implemented.");
  }
  updatePost(post: Post, postDto: PostDto): Promise<Post> {
    throw new Error("Method not implemented.");
  }
  getPostByProperty(property: any): Promise<Post> {
    throw new Error("Method not implemented.");
  }
  getPostByUser(id: string): Promise<Post[]> {
    throw new Error("Method not implemented.");
  }
  getPostByBusiness(id: string): Promise<Post[]> {
    throw new Error("Method not implemented.");
  }
  getPostByLocation(location: AppLocation): Promise<Post[]> {
    throw new Error("Method not implemented.");
  }
  deletePost(Post: Post): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
