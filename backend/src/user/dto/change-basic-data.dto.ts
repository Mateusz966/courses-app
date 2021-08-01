import { IsString } from 'class-validator';
import { ChangeBaseUserDataReq } from '../../../../app-types';

export class ChangeBasicDataDto implements ChangeBaseUserDataReq {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
