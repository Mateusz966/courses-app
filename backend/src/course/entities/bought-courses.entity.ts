import { MyBaseEntity } from 'src/base/MyBaseEntity';
import { Column, CreateDateColumn, Entity } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Course } from './course.entity';
import { BuyCoursesDto } from '../dto/buy-courses.dto';
import { Currency } from '../../../app-types';

@Entity()
export class BoughtCourses extends MyBaseEntity {
  @Column({ type: 'jsonb' })
  userSnapshot: User;

  @Column({ type: 'jsonb' })
  cartSnapshot: any;

  @Column()
  paymentStatus: string;

  @Column()
  totalPrice: number;

  @Column({ type: 'varchar', enum: Currency, default: Currency.PLN })
  currency: Currency;

  @CreateDateColumn()
  boughtAt: string;

  static async buyCourse(user: User, cart: BuyCoursesDto) {
    const boughtCourse = new BoughtCourses();

    boughtCourse.cartSnapshot = cart.courses;
    boughtCourse.userSnapshot = user;
    boughtCourse.paymentStatus = 'OK';
    boughtCourse.totalPrice = cart.totalPrice;
    boughtCourse.currency = cart.currency;
    return boughtCourse.save();
  }

  static async getMyBoughtCourses(userId: string, offset: number) {
    const coursesIds = await this.createQueryBuilder('boughtCourses')
      .select('boughtCourses.id')
      .where(`boughtCourses.user ::jsonb @> '{"id": "${userId}"'`, {
        id: userId,
      });

    return Course.createQueryBuilder('course')
      .select(['course.title', 'course.courseStatus', 'course.id'])
      .leftJoinAndSelect('course.category', 'category')
      .leftJoinAndSelect('course.subcategory', 'subcategory')
      .where('course.id = ANY (:coursesIds)', { coursesIds })
      .skip(offset)
      .take(10)
      .getManyAndCount();
  }
}
