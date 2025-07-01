import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';

@JoiDtoSchema(Joi.object({
  enterpriseId: Joi.number().integer().positive().required().messages({'number.base': 'Enterprise ID must be a number','number.integer': 'Enterprise ID must be an integer','number.positive': 'Enterprise ID must be positive','any.required': 'Enterprise ID is required'}),
  enterpriseName: Joi.string().required(),
  analysisType: Joi.string().valid( "projects", "branche", "department", "campaigns" ).required().messages({'any.only': 'The type of analysis given does not exist','any.required': 'Analysis type is required'}),
  analysedStructureId: Joi.number().integer().positive().required(),
  requestData: Joi.any().required()
}))
export class CreateAnalysisRequestDto {
  enterpriseId: number;
  enterpriseName: string;
  analysisType: "projects" | "branche" | "department" | "campaigns";
  analysedStructureId: number;
  requestData: any;

  constructor(enterpriseId: number, 
              enterpriseName: string,
              analysisType: "projects" | "branche" | "department" | "campaigns", 
              analysedStructureId: number,
              requestData: any) 
              {

    this.enterpriseId = enterpriseId;
    this.enterpriseName = enterpriseName;
    this.analysisType = analysisType;
    this.analysedStructureId = analysedStructureId;
    this.requestData = requestData;
  }
}


