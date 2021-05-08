import { ArgumentMetadata, PipeTransform } from "@nestjs/common";

export class RequestConverterPipe implements PipeTransform {
  transform(data: any, metadata: ArgumentMetadata) {
    if (data?.body) {
      const result = {};
      const objects = JSON?.parse(data?.body);
      console.log('OBJECTS: ', objects);
      for (const obj in objects) {
        if (objects.hasOwnProperty(obj)) {
          result[obj] = objects[obj];
        }
      }
      if (data?.content) {
        result['content'] = data.content;
      }
      if (data?.design) {
        result['design'] = data.design;
      }
      return result;
    } else return data;
  }
}
