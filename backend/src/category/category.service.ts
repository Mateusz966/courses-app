import { Injectable } from '@nestjs/common';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
    async allCategories() {
        try {
            return await Category.find();
        } catch (error) {
            throw error; 
        };
    }
}
