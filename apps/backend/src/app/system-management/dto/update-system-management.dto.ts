import { PartialType } from '@nestjs/mapped-types';
import { CreateSystemManagementDto } from './create-system-management.dto';

export class UpdateSystemManagementDto extends PartialType(CreateSystemManagementDto) {}
