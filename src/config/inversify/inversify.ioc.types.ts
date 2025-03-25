const IOC = {
  SecurityCompliance: Symbol.for("SecurityCompliance"),

  IUserRepository: Symbol.for("IUserRepository"),
  IUserService: Symbol.for("IUserService"),
  UserController: Symbol.for("UserController"),

  IBusinessRepository: Symbol.for("IBusinessRepository"),
  IBusinessService: Symbol.for("IBusinessService"),
  BusinessController: Symbol.for("BusinessController"),

  ICategoryRepository: Symbol.for("ICategoryRepository"),
  ICategoryService: Symbol.for("ICategoryService"),
  CategoryController: Symbol.for("CategoryController"),

  ICommentRepository: Symbol.for("ICommentRepository"),
  ICommentService: Symbol.for("ICommentService"),
  CommentController: Symbol.for("CommentController"),

  IFaqRepository: Symbol.for("IFaqRepository"),
  IFaqService: Symbol.for("IFaqService"),
  FaqController: Symbol.for("FaqController"),

  ILikeRepository: Symbol.for("ILikeRepository"),
  ILikeService: Symbol.for("ILikeService"),
  LikeController: Symbol.for("LikeController"),

  ILocationRepository: Symbol.for("ILocationRepository"),
  ILocationService: Symbol.for("ILocationService"),
  LocationController: Symbol.for("LocationController"),

  IMeasurementRepository: Symbol.for("IMeasurementRepository"),
  IMeasurementService: Symbol.for("IMeasurementService"),
  MeasurementController: Symbol.for("MeasurementController"),

  INotificationRepository: Symbol.for("INotificationRepository"),
  INotificationService: Symbol.for("INotificationService"),
  NotificationController: Symbol.for("NotificationController"),

  IPostRepository: Symbol.for("IPostRepository"),
  IPostService: Symbol.for("IPostService"),
  PostController: Symbol.for("PostController"),

  IReviewRepository: Symbol.for("IReviewRepository"),
  IReviewService: Symbol.for("IReviewService"),
  ReviewController: Symbol.for("ReviewController"),

  ISaveRepository: Symbol.for("ISaveRepository"),
  ISaveService: Symbol.for("ISaveService"),
  SaveController: Symbol.for("SaveController"),

  IMediaRepository: Symbol.for("IMediaRepository"),
  IMediaService: Symbol.for("IMediaService"),
  MediaController: Symbol.for("MediaController"),
};

export { IOC };
