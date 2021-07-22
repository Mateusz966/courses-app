import { CourseStatus } from '../app-types';

export const getCourseStatus = (status: CourseStatus) => {
  switch (status) {
    case CourseStatus.Draft:
      return 'Draft';
    case CourseStatus.Published:
      return 'Published';
    case CourseStatus.Removed:
      return 'Usunięty';
    default:
      return 'Draft';
  }
};
