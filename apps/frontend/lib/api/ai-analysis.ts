import { getAll, getById, create, remove } from './genericRequests';
import { CreateAnalysisRequest, AnalysisResponse } from '../../app/interfaces/ai-analysis';

const AI_ANALYSIS_ENDPOINT = 'ai-analysis';

export const aiAnalysisApi = {
  createAnalysis: (request: CreateAnalysisRequest): Promise<AnalysisResponse> => {
    return create<CreateAnalysisRequest, AnalysisResponse>(AI_ANALYSIS_ENDPOINT, request);
  },

  getAnalysis: (analysisId: string): Promise<AnalysisResponse> => {
    return getAll<AnalysisResponse>(`${AI_ANALYSIS_ENDPOINT}/${analysisId}`);
  },

  getEnterpriseAnalyses: (enterpriseId: number): Promise<AnalysisResponse[]> => {
    return getAll<AnalysisResponse[]>(`${AI_ANALYSIS_ENDPOINT}/enterprise/${enterpriseId}`);
  },

  deleteAnalysis: (analysisId: string): Promise<{ success: boolean }> => {
    return remove<{ success: boolean }>(AI_ANALYSIS_ENDPOINT, analysisId);
  },

  pollAnalysisStatus: async (analysisId: string, maxAttempts: number = 30, intervalMs: number = 2000): Promise<AnalysisResponse> => {
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      const analysis = await aiAnalysisApi.getAnalysis(analysisId);
      
      if (analysis.status === 'completed' || analysis.status === 'failed') {
        return analysis;
      }
      
      await new Promise(resolve => setTimeout(resolve, intervalMs));
      attempts++;
    }
    
    throw new Error('Analysis timeout - maximum polling attempts reached');
  }
};