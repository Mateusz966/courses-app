import { Injectable } from '@nestjs/common';
import { CustomSelectOption } from 'app-types/global';
import { CategoryDto, CreateCourseReq } from '../../app-types/category';
import { Category } from './entities/category.entity';
import { Subcategory } from './entities/subcategory.entity';
import { Topic } from './entities/topic.entity';

type OptionalCreateCourseDto = {
  category?: CustomSelectOption<CategoryDto>,
  categories?: CustomSelectOption<CategoryDto>[],
  subcategory?: CustomSelectOption<CategoryDto>,
  topics?: CustomSelectOption<CategoryDto>[],
}



type SearchedCategories = {
  category?: Category;
  categories?: Category[];
  subcategory?: Subcategory;
  topics?: Topic[];
}


@Injectable()
export class CategoryService {
  async allCategories() {
    try {
      return Category.find();
    } catch (error) {
      throw error;
    }
  }

  async subcategories(categoryId: string) {
    try {
      return Subcategory.find({ where: { category: categoryId } });
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

  /**
   * @description method for check given category, subcategory or topics (all optional) if exist return it if not throw error
   * 
   * @param category - category optional from FE,
   * @param subcategory - subcategory optional from FE
   * @param topics - topics optional from
   * @returns {Promise<SearchedCategories>}
   */

  async areCategoriesExist({ category, categories, subcategory, topics }: OptionalCreateCourseDto): Promise<SearchedCategories> {
    try {
      const res: SearchedCategories = {};

      if (category) {
        res.category = await Category.findOrThrow({ where: { id: category.value.id } })
      }

      if (subcategory) {
        res.subcategory = await Subcategory.findOrThrow({ where: { id: subcategory.value.id } });
      }

      if (categories) {
        res.categories = await Promise.all(categories.map(async (cat) => await Category.findOrThrow({ where: { id: cat.value.id } })))
      }

      if (topics) {
        await Promise.all(topics.map(async (topic) => await Topic.findOrThrow({ where: { id: topic.value.id } })))
      }

      return res

    } catch (error) {
      throw error;
    }
  }
}
