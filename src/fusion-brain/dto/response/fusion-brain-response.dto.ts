import { ResponseStatusEnum } from '../enum';

export class FusionBrainResponseDto {
  status: ResponseStatusEnum;
  uuid: string;
  status_time: number;
}
