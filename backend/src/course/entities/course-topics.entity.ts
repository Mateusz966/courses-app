import { Entity, BaseEntity, ManyToOne } from 'typeorm';
import { Topic } from '../../category/entities/topic.entity';
import { Course } from './course.entity';
import { ICourseTopics } from '../../../app-types';

@Entity()
export class CourseTopics extends BaseEntity implements ICourseTopics {
  @ManyToOne(() => Topic, (topic) => topic.courseTopics, { primary: true })
  topic: Topic;

  @ManyToOne(() => Course, (course) => course.courseTopics, { primary: true })
  course: Course;

  static getCourseTopics(courseId: string) {
    return this.createQueryBuilder('topics')
      .leftJoin('topics.topic', 'topic')
      .where('topics.course = :id', { id: courseId })
      .select(['topic.name', 'topic.id'])
      .getRawMany();
  }

  static removeCourseTopics(courseId: string) {
    return this.createQueryBuiler('topics')
    .leftJoin('topics.topic', 'topic')
    .where('topics.course = :id', { id: courseId })
    .delete()
    .execute();
  }

}
