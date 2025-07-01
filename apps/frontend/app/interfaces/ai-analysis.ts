export interface CreateAnalysisRequest {
  enterpriseId: number;
  analysisType: 'organizational_structure' | 'financial_health' | 'operational_efficiency' | 'market_position' | 'growth_opportunities' | 'risk_assessment' | 'comprehensive';
  includeRecommendations?: boolean;
  focusAreas?: string[];
  timeframe?: 'current' | 'quarterly' | 'yearly';
}

export interface AnalysisResponse {
  id: string;
  enterpriseId: number;
  analysisType: string;
  status: 'processing' | 'completed' | 'failed';
  results?: {
    summary: string;
    keyFindings: string[];
    recommendations: {
      priority: 'high' | 'medium' | 'low';
      category: string;
      title: string;
      description: string;
      expectedImpact: string;
      implementationComplexity: 'low' | 'medium' | 'high';
      estimatedTimeframe: string;
    }[];
    metrics: {
      name: string;
      value: string | number;
      trend: 'positive' | 'negative' | 'neutral';
      benchmark?: string;
    }[];
    riskFactors: {
      level: 'low' | 'medium' | 'high' | 'critical';
      category: string;
      description: string;
      mitigation: string;
    }[];
  };
  createdAt: string;
  completedAt?: string;
  error?: string;
}

export interface AnalysisTypeOption {
  value: CreateAnalysisRequest['analysisType'];
  label: string;
  description: string;
  icon: string;
}

export const ANALYSIS_TYPES: AnalysisTypeOption[] = [
  {
    value: 'comprehensive',
    label: 'Análise Abrangente',
    description: 'Análise completa de todos os aspectos da empresa',
    icon: '🔍'
  },
  {
    value: 'organizational_structure',
    label: 'Estrutura Organizacional',
    description: 'Análise da estrutura de departamentos e hierarquia',
    icon: '🏢'
  },
  {
    value: 'financial_health',
    label: 'Saúde Financeira',
    description: 'Análise de receitas, despesas e rentabilidade',
    icon: '💰'
  },
  {
    value: 'operational_efficiency',
    label: 'Eficiência Operacional',
    description: 'Análise de processos e produtividade',
    icon: '⚙️'
  },
  {
    value: 'market_position',
    label: 'Posição no Mercado',
    description: 'Análise competitiva e posicionamento',
    icon: '📊'
  },
  {
    value: 'growth_opportunities',
    label: 'Oportunidades de Crescimento',
    description: 'Identificação de áreas para expansão',
    icon: '📈'
  },
  {
    value: 'risk_assessment',
    label: 'Avaliação de Riscos',
    description: 'Identificação e análise de riscos empresariais',
    icon: '⚠️'
  }
];

export const PRIORITY_COLORS = {
  high: 'text-red-600 bg-red-100',
  medium: 'text-yellow-600 bg-yellow-100',
  low: 'text-green-600 bg-green-100'
};

export const RISK_LEVEL_COLORS = {
  critical: 'text-red-800 bg-red-200',
  high: 'text-red-600 bg-red-100',
  medium: 'text-yellow-600 bg-yellow-100',
  low: 'text-green-600 bg-green-100'
};

export const TREND_COLORS = {
  positive: 'text-green-600',
  negative: 'text-red-600',
  neutral: 'text-gray-600'
};

export const COMPLEXITY_COLORS = {
  low: 'text-green-600 bg-green-100',
  medium: 'text-yellow-600 bg-yellow-100',
  high: 'text-red-600 bg-red-100'
};