import { Injectable } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { Subcategory } from './entities/subcategory.entity';
import { Topic } from './entities/topic.entity';

@Injectable()
export class CategoryService {
  async allCategories() {
    try {
      return await Category.find();
    } catch (error) {
      throw error;
    }
  }

  async subcategories(categoryId: string) {
    try {
      return await Subcategory.find({ where: { category: categoryId } });
    } catch (error) {
      throw error;
    }
  }

  async topics(categoryId: string, subcategoryId: string) {
    try {
      return await Topic.find({
        where: [{ category: categoryId }, { subcategory: subcategoryId }],
      });
    } catch (error) {
      throw error;
    }
  }
}
