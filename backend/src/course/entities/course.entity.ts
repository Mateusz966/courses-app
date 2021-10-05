import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Subcategory } from 'src/category/entities/subcategory.entity';
import { MyBaseEntity } from 'src/base/MyBaseEntity';
import { Category } from '../../category/entities/category.entity';
import { User } from '../../user/entity/user.entity';
import { CourseTopics } from './course-topics.entity';
import { Section } from './section.entity';
import { CourseDetails, CourseStatus, ICourse } from '../../../app-types';

@Entity()
export class Course extends MyBaseEntity implements ICourse {
  @Column({ type: 'varchar', default: 'No title' })
  title: string;

  @Column({ type: 'varchar', default: '' })
  description: string;

  @Column({ type: 'text', default: '' })
  content: string;

  @Column({ default: CourseStatus.Draft })
  courseStatus: CourseStatus;

  @Column({ nullable: true })
  courseFn: string;

  @OneToMany(() => CourseTopics, (courseTopic) => courseTopic.course)
  courseTopics: CourseTopics[];

  @OneToMany(() => Section, (section) => section.course)
  section: Section;

  @ManyToOne(() => User, (user) => user.course)
  user: User;

  @ManyToOne(() => Category, (category) => category.course)
  category: Category;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.course)
  subcategory: Subcategory;

  static getWithUser(userId: string, courseId: string) {
    return this.createQueryBuilder('course')
      .where('course.id = :id', { id: courseId })
      .andWhere('course.user = :userId', { userId })
      .leftJoinAndSelect('course.user', 'user')
      .select(['course', 'user.id'])
      .getOneOrFail();
  }

  static async getCourseDetailsById(courseId: string): Promise<CourseDetails> {
    const res: CourseDetails = await this.createQueryBuilder('course')
      .where('course.id = :id', { id: courseId })
      .leftJoinAndSelect('course.category', 'category')
      .leftJoinAndSelect('course.subcategory', 'subcategory')
      .leftJoinAndSelect('course.user', 'user')
      .leftJoinAndSelect('course.courseTopics', 'topics')
      .leftJoinAndSelect('course.section', 'section')
      .leftJoinAndSelect('section.lesson', 'lesson')
      .getOneOrFail();
    return res;
  }

  static published(
    userId: string,
    offset: number,
    filterBy: {
      categories?: string;
      subcategories?: string;
    },
    limit?: number,
  ) {
    const query = this.createQueryBuilder('course')
      .select(['course.title', 'course.courseStatus', 'course.id'])
      .leftJoinAndSelect('course.category', 'category')
      .leftJoinAndSelect('course.subcategory', 'subcategory')
      .where('course.user != :id', { id: userId })
      .where('course.courseStatus = :status', {
        status: CourseStatus.Published,
      })
      .skip(offset)
      .take(limit);

    if (filterBy?.categories) {
      const categories = filterBy.categories.split(',');
      query.andWhere('category.id = ANY (:categories)', {
        categories,
      });
    }

    if (filterBy?.subcategories) {
      const subcategories = filterBy.subcategories.split(',');
      query.orWhere('subcategory.id = ANY (:subcategories)', {
        subcategories,
      });
    }

    return query.getManyAndCount();
  }
}
