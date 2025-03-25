import Business from "../models/Business";
import Category from "../models/Category";
import AppComment from "../models/Comment";
import Faq from "../models/Faq";
import Like from "../models/Like";
import AppLocation from "../models/Location";
import Measurement from "../models/Measurement";
import Media from "../models/Media";
import AppNotification from "../models/Notification";
import Post from "../models/Post";
import Review from "../models/Review";
import Save from "../models/Save";
import User from "../models/User";
import IRepository from "./IRepository";

export interface IBusinessRepository extends IRepository<Business> {}
export interface ICommentRepository extends IRepository<AppComment> {}
export interface IFaqRepository extends IRepository<Faq> {}
export interface ILikeRepository extends IRepository<Like> {}
export interface ILocationRepository extends IRepository<AppLocation> {}
export interface ICategoryRepository extends IRepository<Category> {}
export interface IMeasurementRepository extends IRepository<Measurement> {}
export interface INotificationRepository extends IRepository<AppNotification> {}
export interface IPostRepository extends IRepository<Post> {}
export interface IReviewRepository extends IRepository<Review> {}
export interface ISaveRepository extends IRepository<Save> {}
export interface IUserRepository extends IRepository<User> {}
export interface IMediaRepository extends IRepository<Media> {}
