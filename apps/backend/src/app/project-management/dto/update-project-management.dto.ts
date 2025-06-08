import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectManagementDto } from './create-project-management.dto';

export class UpdateProjectManagementDto extends PartialType(CreateProjectManagementDto) {}
