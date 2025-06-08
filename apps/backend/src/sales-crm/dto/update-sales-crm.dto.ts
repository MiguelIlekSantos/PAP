import { PartialType } from '@nestjs/mapped-types';
import { CreateSalesCrmDto } from './create-sales-crm.dto';

export class UpdateSalesCrmDto extends PartialType(CreateSalesCrmDto) {}
