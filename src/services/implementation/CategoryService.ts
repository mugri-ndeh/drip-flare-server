import { injectable, inject } from "inversify";
import { IOC } from "../../config/inversify/inversify.ioc.types";
import { ICategoryRepository } from "../../repository/RepositoryInterfaces";

import ICategoryService from "../ICategoryService";
import { CategoryDto } from "../../dto/CategoryDto";
import Category from "../../models/Category";
import { plainToClass } from "class-transformer";

@injectable()
export default class CategoryService implements ICategoryService {
  private readonly iCategoryRepository: ICategoryRepository;

  constructor(
    @inject(IOC.ICategoryRepository) CategoryRepository: ICategoryRepository
  ) {
    this.iCategoryRepository = CategoryRepository;
  }
  async getAllCategories(property: any): Promise<Category[]> {
    let categories = await this.iCategoryRepository.find();
    return Promise.resolve(categories);
  }
  async createCategory(categoryRequestDto: CategoryDto): Promise<Category> {
    let data = plainToClass(Category, categoryRequestDto);
    const category = await this.iCategoryRepository.create(data);
    return Promise.resolve(category);
  }
  async updateCategory(
    category: Category,
    categoryDto: CategoryDto
  ): Promise<Category> {
    let categoryU: Category = await this.iCategoryRepository.findOne({
      id: category.id,
    });

    for (const [key, value] of Object.entries(categoryDto)) {
      if (value !== undefined) {
        (categoryU as any)[key] = value;
      }
    }

    const categoryResponse: Category = await this.iCategoryRepository.update(
      category.id,
      categoryU
    );

    return Promise.resolve(categoryResponse);
  }
  async getCategoryByProperty(property: any): Promise<Category> {
    try {
      const category = await this.iCategoryRepository.findOne(property);
      return Promise.resolve(category);
    } catch (error) {
      throw error;
    }
  }
  async getCategoryEntityById(id: string): Promise<Category> {
    throw new Error("Method not implemented.");
  }
  async deleteCategory(Category: Category): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
