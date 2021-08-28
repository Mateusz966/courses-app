
import { Topic } from "../../category/entities/topic.entity";
import { Entity, BaseEntity, ManyToOne } from "typeorm";
import { Course } from "./course.entity";
import { ICourseTopics } from "../../../app-types/course";


@Entity()
export class CourseTopics extends BaseEntity implements ICourseTopics { 

    @ManyToOne(() => Topic, topic => topic.courseTopics, { primary: true })
    topic: Topic;

    @ManyToOne(() => Course, course => course.courseTopics, { primary: true, })
    course: Course;
} 