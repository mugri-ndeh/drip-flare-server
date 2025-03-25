import { injectable, inject } from "inversify";
import { IOC } from "../../config/inversify/inversify.ioc.types";
import ICategoryRepository from "../ICategoryService";
import ICategoryService from "../ICategoryService";
import { CategoryDto } from "../../dto/CategoryDto";
import Category from "../../models/Category";

@injectable()
export default class CategoryService implements ICategoryService {
  private readonly iCategoryRepository: ICategoryRepository;

  constructor(
    @inject(IOC.ICategoryRepository) CategoryRepository: ICategoryRepository
  ) {
    this.iCategoryRepository = CategoryRepository;
  }
  createCategory(categoryRequestDto: CategoryDto): Promise<Category> {
    throw new Error("Method not implemented.");
  }
  updateCategory(
    category: Category,
    categoryDto: CategoryDto
  ): Promise<Category> {
    throw new Error("Method not implemented.");
  }
  geCategoryByProperty(property: any): Promise<Category> {
    throw new Error("Method not implemented.");
  }
  getCategoryEntityById(id: string): Promise<Category> {
    throw new Error("Method not implemented.");
  }
  deleteCategory(Category: Category): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
