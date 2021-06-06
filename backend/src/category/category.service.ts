import { Injectable } from '@nestjs/common';
import { CreateCourse } from '../../app-types/category';
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


  async areCategoriesExist({ category, subcategory, topics }: CreateCourse) {
    try {
      const searchedCategory = await Category.findOrThrow({ where: { id: category.value.id } });
      const searchedSubcategory = await Subcategory.findOrThrow({ where: { id: subcategory.value.id } });
      const searchedTopics = await Promise.all(topics.map(async (topic) => await Topic.findOrThrow({ where: { id: topic.value.id } })))

      return { category: searchedCategory, subcategory: searchedSubcategory, topics: searchedTopics }

    } catch (error) {
      throw error;
    }
  }
}
