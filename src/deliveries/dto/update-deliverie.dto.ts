import { PartialType } from '@nestjs/mapped-types';
import { CreateDeliverieDto } from './create-deliverie.dto';

export class UpdateDeliverieDto extends PartialType(CreateDeliverieDto) {}
