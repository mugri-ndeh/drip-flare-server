import { Repository } from "typeorm";
import BusinessController from "../../controllers/BusinessController";
import CategoryController from "../../controllers/CategoryController";
import UserController from "../../controllers/UserController";
import SecurityComplianceImpl from "../../middlewares/security/implementation/SecurityComplianceImpl";
import SecurityCompliance from "../../middlewares/security/SecurityCompliance";
import BusinessRepository from "../../repository/implementation/BusinessRespository";
import CategoryRepository from "../../repository/implementation/CategoryRepository";
import UserRepository from "../../repository/implementation/UserRepository";
import {
  IBusinessRepository,
  ICategoryRepository,
  ICommentRepository,
  IFaqRepository,
  ILikeRepository,
  ILocationRepository,
  IMeasurementRepository,
  IMediaRepository,
  INotificationRepository,
  IPostRepository,
  IReviewRepository,
  ISaveRepository,
  IUserRepository,
} from "../../repository/RepositoryInterfaces";
import IBusinessService from "../../services/IBusinessService";
import ICategoryService from "../../services/ICategoryService";
import BusinessService from "../../services/implementation/BusinessService";
import CategoryService from "../../services/implementation/CategoryService";
import UserService from "../../services/implementation/UserService";
import IUserService from "../../services/IUserService";

import DependencyInjectionManager from "./DependencyInjectionManager";
import { IOC } from "./inversify.ioc.types";
import CommentController from "../../controllers/CommentController";
import CommentRepository from "../../repository/implementation/CommentRepository";
import ICommentService from "../../services/ICommentService";
import CommentService from "../../services/implementation/CommentService";
import FaqController from "../../controllers/FaqController";
import FaqRepository from "../../repository/implementation/FaqRepository";
import IFaqService from "../../services/IFaqService";
import FaqService from "../../services/implementation/FaqService";
import LikeController from "../../controllers/LikeController";

import MeasurementController from "../../controllers/MeasurementController";
import LikeRepository from "../../repository/implementation/LikeRepository";
import LocationRepository from "../../repository/implementation/LocationRepository";
import MeasurementRepository from "../../repository/implementation/MeasurementRepository";
import ILikeService from "../../services/ILikeService";
import ILocationService from "../../services/ILocationService";
import IMeasurementService from "../../services/IMeasurementService";
import LikeService from "../../services/implementation/LikeService";
import LocationService from "../../services/implementation/LocationService";
import MeasurementService from "../../services/implementation/MeasurementService";

import MediaController from "../../controllers/MediaController";
import NotificationController from "../../controllers/NotificationController";
import MediaRepository from "../../repository/implementation/MediaRepository";
import NotificationRepository from "../../repository/implementation/NotificationRepository";
import IMediaService from "../../services/IMediaService";
import MediaService from "../../services/implementation/MediaService";
import NotificationService from "../../services/implementation/NotificationService";
import INotificationService from "../../services/INotificationService";
import PostController from "../../controllers/PostController";
import ReviewController from "../../controllers/ReviewController";
import SaveController from "../../controllers/SaveController";
import ReviewRepository from "../../repository/implementation/ReviewRepository";
import SaveRepository from "../../repository/implementation/SaveRepository";
import PostService from "../../services/implementation/PostService";
import ReviewService from "../../services/implementation/ReviewService";
import SaveService from "../../services/implementation/SaveService";
import IPostService from "../../services/IPostService";
import IReviewService from "../../services/IReviewService";
import ISaveService from "../../services/ISaveService";
import PostRepository from "../../repository/implementation/PostRepository";
import LocationController from "../../controllers/Locationcontroller";

const container = DependencyInjectionManager.getInstance().getContainer();

// security
container
  .bind<SecurityCompliance>(IOC.SecurityCompliance)
  .to(SecurityComplianceImpl);

// user
container.bind<IUserRepository>(IOC.IUserRepository).to(UserRepository);
container.bind<UserController>(IOC.UserController).to(UserController);
container.bind<IUserService>(IOC.IUserService).to(UserService);

// business
container
  .bind<IBusinessRepository>(IOC.IBusinessRepository)
  .to(BusinessRepository);
container
  .bind<BusinessController>(IOC.BusinessController)
  .to(BusinessController);
container.bind<IBusinessService>(IOC.IBusinessService).to(BusinessService);

// category
container
  .bind<ICategoryRepository>(IOC.ICategoryRepository)
  .to(CategoryRepository);
container
  .bind<CategoryController>(IOC.CategoryController)
  .to(CategoryController);
container.bind<ICategoryService>(IOC.ICategoryService).to(CategoryService);

// comment
container
  .bind<ICommentRepository>(IOC.ICommentRepository)
  .to(CommentRepository);
container.bind<CommentController>(IOC.CommentController).to(CommentController);
container.bind<ICommentService>(IOC.ICommentService).to(CommentService);

// fW
container.bind<IFaqRepository>(IOC.IFaqRepository).to(FaqRepository);
container.bind<FaqController>(IOC.FaqController).to(FaqController);
container.bind<IFaqService>(IOC.IFaqService).to(FaqService);

// LIKE
container.bind<ILikeRepository>(IOC.ILikeRepository).to(LikeRepository);
container.bind<LikeController>(IOC.LikeController).to(LikeController);
container.bind<ILikeService>(IOC.ILikeService).to(LikeService);

//  location
container
  .bind<ILocationRepository>(IOC.ILocationRepository)
  .to(LocationRepository);
container
  .bind<LocationController>(IOC.LocationController)
  .to(LocationController);
container.bind<ILocationService>(IOC.ILocationService).to(LocationService);

// measurement
container
  .bind<IMeasurementRepository>(IOC.IMeasurementRepository)
  .to(MeasurementRepository);
container
  .bind<MeasurementController>(IOC.MeasurementController)
  .to(MeasurementController);
container
  .bind<IMeasurementService>(IOC.IMeasurementService)
  .to(MeasurementService);

// media
container.bind<IMediaRepository>(IOC.IMediaRepository).to(MediaRepository);
container.bind<MediaController>(IOC.MediaController).to(MediaController);
container.bind<IMediaService>(IOC.IMediaService).to(MediaService);

// notification
container
  .bind<INotificationRepository>(IOC.INotificationRepository)
  .to(NotificationRepository);
container
  .bind<NotificationController>(IOC.NotificationController)
  .to(NotificationController);
container
  .bind<INotificationService>(IOC.INotificationService)
  .to(NotificationService);

// post
container.bind<IPostRepository>(IOC.IPostRepository).to(PostRepository);
container.bind<PostController>(IOC.PostController).to(PostController);
container.bind<IPostService>(IOC.IPostService).to(PostService);

// review
container.bind<IReviewRepository>(IOC.IReviewRepository).to(ReviewRepository);
container.bind<ReviewController>(IOC.ReviewController).to(ReviewController);
container.bind<IReviewService>(IOC.IReviewService).to(ReviewService);

// save
container.bind<ISaveRepository>(IOC.ISaveRepository).to(SaveRepository);
container.bind<SaveController>(IOC.SaveController).to(SaveController);
container.bind<ISaveService>(IOC.ISaveService).to(SaveService);

export { container };
