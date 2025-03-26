import { injectable, inject } from "inversify";
import { IOC } from "../../config/inversify/inversify.ioc.types";
import IPostService from "../IPostService";
import { IPostRepository } from "../../repository/RepositoryInterfaces";
import { PostDto } from "../../dto/PostDto";
import AppLocation from "../../models/Location";
import Post from "../../models/Post";
import { plainToClass } from "class-transformer";

@injectable()
export default class PostService implements IPostService {
  private readonly iPostRepository: IPostRepository;

  constructor(@inject(IOC.IPostRepository) PostRepository: IPostRepository) {
    this.iPostRepository = PostRepository;
  }
  async getAllPosts(): Promise<Post[]> {
    const posts = await this.iPostRepository.find();
    return Promise.resolve(posts);
  }
  async createPost(postRequestDto: PostDto): Promise<Post> {
    let data = plainToClass(Post, postRequestDto);
    const post = await this.iPostRepository.create(data);
    return Promise.resolve(post);
  }
  async updatePost(post: Post, postDto: PostDto): Promise<Post> {
    if (postDto)
      for (const [key, value] of Object.entries(postDto)) {
        if (value !== undefined) {
          (post as any)[key] = value;
        }
      }

    const postResponse: Post = await this.iPostRepository.update(post.id, post);

    return Promise.resolve(postResponse);
  }
  async getPostByProperty(property: any): Promise<Post> {
    const post = await this.iPostRepository.findOne(property);
    return Promise.resolve(post);
  }
  async getPostByUser(id: string): Promise<Post[]> {
    const post = await this.iPostRepository.find({ userId: id });
    return Promise.resolve(post);
  }
  async getPostByBusiness(id: string): Promise<Post[]> {
    const post = await this.iPostRepository.find({ businessId: id });
    return Promise.resolve(post);
  }
  async getPostByLocation(location: AppLocation): Promise<Post[]> {
    throw new Error("Method not implemented.");
  }
  async deletePost(post: Post): Promise<void> {
    await this.iPostRepository.delete(post);
  }
}
