import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateAnalysisRequestDto } from '../DTO/ai-analysis.dto';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class AiModuleService {
  private genAI: GoogleGenAI;

  constructor(private prisma: PrismaService) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not defined in the environment');
    }

    this.genAI = new GoogleGenAI({ apiKey });
    console.log('Gemini client initialized successfully');
  }

  async createAnalysis(data: CreateAnalysisRequestDto): Promise<any> {
    console.log('=== DEBUG: Request recebido no backend (createAnalysis) ===');
    console.log('analysisType:', data.analysisType);
    console.log('analysedStructureId:', data.analysedStructureId);
    console.log('requestData:', JSON.stringify(data.requestData, null, 2));
    
    const { enterpriseId, analysisType } = data;

    const enterprise = await this.prisma.enterprise.findUnique({
      where: { id: enterpriseId }
    });

    if (!enterprise) {
      throw new BadRequestException('Enterprise not found');
    }

    try {
      const analysisResult = await this.performAIAnalysis(data);
      
      console.log("----------------------------------------")
      console.log(analysisResult)
      console.log("----------------------------------------")

      return {
        id: `analysis_${enterpriseId}_${Date.now()}`,
        enterpriseId,
        analysisType,
        status: 'completed',
        createdAt: new Date(),
        completedAt: new Date(),
        results: analysisResult
      };
    } catch (error) {
      console.error('Error performing AI analysis:', error);
      
      return {
        id: `analysis_${enterpriseId}_${Date.now()}`,
        enterpriseId,
        analysisType,
        status: 'failed',
        createdAt: new Date(),
        error: 'Erro ao realizar análise de IA'
      };
    }
  }

  async performAIAnalysis(request: CreateAnalysisRequestDto): Promise<any> {
    console.log('=== DEBUG: Request recebido no backend ===');
    console.log('analysisType:', request.analysisType);
    console.log('analysedStructureId:', request.analysedStructureId);
    console.log('requestData:', JSON.stringify(request.requestData, null, 2));
    
    const prompt = this.buildAnalysisPrompt(request);

    try {
      const systemPrompt = "You are an expert business analyst specializing in enterprise analysis and strategic recommendations. Provide detailed, actionable insights based on the company data provided.";
      const fullPrompt = systemPrompt + "\n\n" + prompt;

      console.log('Sending request to Gemini model...');

      const response = await this.genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: fullPrompt,
      });

      console.log('Response received from Gemini model');

      if (!response || !response.text) {
        console.error('Empty or invalid response from Gemini:', response);
        throw new Error('Invalid AI response');
      }

      const aiResponse = response.text;
      return this.parseAIResponse(aiResponse, request.analysisType);
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new InternalServerErrorException('Serviço de IA indisponível no momento. Por favor, tente novamente mais tarde.');
    }
  }

  private buildAnalysisPrompt(request: CreateAnalysisRequestDto): string {
    let focusAreaDescription = '';
    let dataDescription = '';

    if (typeof request.requestData === 'object') {
      dataDescription = JSON.stringify(request.requestData, null, 2);
    } else {
      dataDescription = String(request.requestData);
    }

    switch (request.analysisType) {
      case 'projects':
        focusAreaDescription = 'projeto específico da empresa';
        break;
      case 'branche':
        focusAreaDescription = 'filial específica da empresa';
        break;
      case 'department':
        focusAreaDescription = 'departamento específico da empresa';
        break;
      case 'campaigns':
        focusAreaDescription = 'campanha específica da empresa';
        break;
      default:
        focusAreaDescription = `área "${request.analysedStructureId}" da empresa`;
    }


    return `
			Você é um consultor especializado em análise empresarial para a empresa ${request.enterpriseName}.
			Analise os seguintes dados sobre a ${focusAreaDescription} e forneça insights e sugestões de melhorias específicas para esta estrutura:

			DADOS PARA ANÁLISE:
			${dataDescription}

			Sua tarefa é analisar esta estrutura específica (não a empresa como um todo) e fornecer recomendações direcionadas para melhorar seu desempenho, eficiência e resultados.

			Por favor, forneça sua análise no seguinte formato estruturado com cabeçalhos claros:

			# RESUMO
			[Forneça um resumo conciso da situação atual desta estrutura específica com base nos dados]

			# INSIGHTS
			- [Insight 1 específico para esta estrutura]
			- [Insight 2 específico para esta estrutura]
			- [Insight 3 específico para esta estrutura]
			- [Insight 4 específico para esta estrutura]
			- [Insight 5 específico para esta estrutura]

			# SUGESTÕES DE MELHORIAS
			1. [Sugestão de alta prioridade]: [Descrição detalhada da melhoria específica para esta estrutura]
			   - Complexidade de implementação: [Baixa/Média/Alta]
			   - Prazo estimado: [Prazo estimado]

			2. [Sugestão de média prioridade]: [Descrição detalhada da melhoria específica para esta estrutura]
			   - Complexidade de implementação: [Baixa/Média/Alta]
			   - Prazo estimado: [Prazo estimado]

			3. [Sugestão de baixa prioridade]: [Descrição detalhada da melhoria específica para esta estrutura]
			   - Complexidade de implementação: [Baixa/Média/Alta]
			   - Prazo estimado: [Prazo estimado]

			[Continue com mais 2-4 sugestões específicas para esta estrutura]

			Lembre-se: Suas recomendações devem ser específicas para esta estrutura particular, não genéricas para toda a empresa.
			Este formato estruturado é essencial para o processamento adequado e exibição dos resultados da análise.
			`;
  }

  private parseAIResponse(aiResponse: string, focusArea: string): any {
    console.log('Parsing AI response for focused analysis...');

    try {
      // Extract summary
      let summary = '';
      const summaryMatch = aiResponse.match(/(?:Resumo|RESUMO|Summary|SUMMARY)([\s\S]*?)(?=\n\n.*(?:Insights|INSIGHTS|Sugestões|SUGESTÕES))/i);

      if (summaryMatch && summaryMatch[1]) {
        summary = summaryMatch[1].trim();
      } else {
        // If no summary section found, use the first paragraph
        const firstParagraph = aiResponse.split('\n\n')[0];
        summary = firstParagraph.trim();
      }

      // Extract insights
      let insights: string[] = [];
      const insightsRegex = /(?:Insights|INSIGHTS)(?::|：)?([\s\S]*?)(?=\n\n.*(?:Sugestões|SUGESTÕES|Melhorias|MELHORIAS))/i;
      const insightsMatch = aiResponse.match(insightsRegex);

      if (insightsMatch && insightsMatch[1]) {
        const insightsText = insightsMatch[1].trim();
        // Extract bullet points or numbered items
        const bulletPoints = insightsText.split(/\n\s*[-•*]\s*|\n\s*\d+[.)]\s*/).filter(item => item.trim().length > 0);
        insights = bulletPoints.map(item => item.trim());
      }

      // If no insights were found, extract some from the text
      if (insights.length === 0) {
        // Try to extract sentences that might be insights
        const sentences = aiResponse.split(/[.!?]/).filter(s => s.trim().length > 20);
        insights = sentences.slice(0, 5).map(s => s.trim());
      }

      // Extract suggestions
      let suggestions: any = [];
      const suggestionsRegex = /(?:Sugestões|SUGESTÕES|Melhorias|MELHORIAS|Sugestões de Melhorias|SUGESTÕES DE MELHORIAS)(?::|：)?([\s\S]*?)(?=\n\n.*(?:Conclusão|CONCLUSÃO|$))/i;
      const suggestionsMatch = aiResponse.match(suggestionsRegex);

      if (suggestionsMatch && suggestionsMatch[1]) {
        const suggestionsText = suggestionsMatch[1].trim();
        // Extract numbered items or bullet points
        const suggestionPoints = suggestionsText.split(/\n\s*\d+[.)]\s*|\n\s*[-•*]\s*/).filter(item => item.trim().length > 0);

        suggestions = suggestionPoints.slice(0, 6).map((item, index) => {
          // Try to extract priority from the text
          let priority: 'high' | 'medium' | 'low' = 'medium';
          if (item.toLowerCase().includes('alta prioridade') || item.toLowerCase().includes('urgente') || item.toLowerCase().includes('crítico')) {
            priority = 'high';
          } else if (item.toLowerCase().includes('baixa prioridade') || item.toLowerCase().includes('menor')) {
            priority = 'low';
          }

          // Try to extract title and description
          let title = '';
          let description = item;

          // If the item contains a colon, use the text before the colon as the title
          if (item.includes(':')) {
            const parts = item.split(':');
            title = parts[0].trim();
            description = parts.slice(1).join(':').trim();
          } else {
            // Otherwise use the first sentence or up to 50 chars
            title = item.split('.')[0].trim();
            if (title.length > 50) {
              title = title.substring(0, 50) + '...';
            }
          }

          // Try to extract complexity
          let implementationComplexity: 'high' | 'medium' | 'low' = 'medium';
          if (item.toLowerCase().includes('complexidade: alta') || item.toLowerCase().includes('complexidade de implementação: alta')) {
            implementationComplexity = 'high';
          } else if (item.toLowerCase().includes('complexidade: baixa') || item.toLowerCase().includes('complexidade de implementação: baixa')) {
            implementationComplexity = 'low';
          }

          // Try to extract timeframe
          let estimatedTimeframe = '2-3 meses';
          const timeframeMatch = item.match(/prazo(?:\sestimado)?:\s*([^.]+)/i);
          if (timeframeMatch && timeframeMatch[1]) {
            estimatedTimeframe = timeframeMatch[1].trim();
          }

          return {
            title,
            description,
            priority,
            implementationComplexity,
            estimatedTimeframe
          };
        });
      }

      // If no suggestions were found, create a default one
      if (suggestions.length === 0) {
        suggestions = [
          {
            title: `Análise de ${focusArea}`,
            description: 'Realize uma análise mais detalhada para identificar oportunidades de melhoria.',
            priority: 'medium',
            implementationComplexity: 'medium',
            estimatedTimeframe: '1-2 meses'
          }
        ];
      }

      console.log('AI response parsed successfully for focused analysis');

      return {
        focusArea,
        suggestions,
        insights,
        summary
      };
    } catch (error) {
      console.error('Error parsing AI response for focused analysis:', error);
      throw new InternalServerErrorException('Erro ao processar a resposta da IA. Por favor, tente novamente mais tarde.');
    }
  }
}


