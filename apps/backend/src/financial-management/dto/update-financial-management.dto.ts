import { PartialType } from '@nestjs/mapped-types';
import { CreateFinancialManagementDto } from './create-financial-management.dto';

export class UpdateFinancialManagementDto extends PartialType(CreateFinancialManagementDto) {}
