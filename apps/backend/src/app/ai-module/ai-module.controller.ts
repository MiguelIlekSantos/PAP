import { Controller, Post, Body, UseGuards, UsePipes } from '@nestjs/common';
import { AiModuleService } from './ai-module.service';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { CreateAnalysisRequestDto } from '../DTO/ai-analysis.dto';

@UseGuards(RolesGuard)
@Controller('ai-analysis')
export class AiModuleController {
  constructor(private readonly aiModuleService: AiModuleService) {}

  @Roles([Permissions.AI_ANALYSIS_CREATE])
  @Post('focused')
  @UsePipes(new JoiValidationPipe)
  async AIAnalysis(@Body() request: CreateAnalysisRequestDto): Promise<any> {
    return this.aiModuleService.createAnalysis(request);
  }
}