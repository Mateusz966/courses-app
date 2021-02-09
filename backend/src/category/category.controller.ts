import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CategoryService } from './category.service';
import { Subcategory } from './entities/subcategory.entity';
import { Topic } from './entities/topic.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/all')
  async allCategories() {
    return await this.categoryService.allCategories();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/subcategory/:categoryId')
  async subcategories(
    @Param('categoryId') categoryId: string
  ): Promise<Subcategory[]> {
    return await this.categoryService.subcategories(categoryId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/subcategory/:categoryId/:subcategoryId')
  async topics(
    @Param('categoryId') categoryId: string,
    @Param('subcategoryId') subcategoryId: string,
  ): Promise<Topic[]> {
    return await this.categoryService.topics(categoryId, subcategoryId);
  }
}
