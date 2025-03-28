import { CategoryDto } from "../dto/CategoryDto";
import Category from "../models/Category";

export default interface ICategoryService {
  createCategory(categoryRequestDto: CategoryDto): Promise<Category>;

  updateCategory(
    category: Category,
    categoryDto: CategoryDto
  ): Promise<Category>;

  getCategoryByProperty(property: any): Promise<Category>;

  getAllCategories(property: any): Promise<Category[]>;

  getCategoryEntityById(id: string): Promise<Category>;

  deleteCategory(Category: Category): Promise<void>;
}
