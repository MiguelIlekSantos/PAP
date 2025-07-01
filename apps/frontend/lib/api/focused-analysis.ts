import { create } from './genericRequests';
import { FocusedAnalysisRequest, FocusedAnalysisResponse } from '../../app/interfaces/focused-analysis';

const FOCUSED_ANALYSIS_ENDPOINT = 'ai-analysis/focused';

export const focusedAnalysisApi = {
  analyzeFocusArea: (request: FocusedAnalysisRequest): Promise<FocusedAnalysisResponse> => {
    return create<FocusedAnalysisRequest, FocusedAnalysisResponse>(FOCUSED_ANALYSIS_ENDPOINT, request);
  }
};