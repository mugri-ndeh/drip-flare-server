import { injectable, inject } from "inversify";
import { IOC } from "../config/inversify/inversify.ioc.types";
import ICategoryService from "../services/ICategoryService";

@injectable()
export default class CategoryController {
  private categoryService: ICategoryService;

  constructor(@inject(IOC.ICategoryService) CategoryService: ICategoryService) {
    this.categoryService = CategoryService;
  }
}
