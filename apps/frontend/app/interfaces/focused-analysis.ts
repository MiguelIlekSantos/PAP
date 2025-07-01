export interface FocusedAnalysisRequest {
  enterpriseId: number;
  enterpriseName: string;
  analysisType: "projects" | "branche" | "department" | "campaigns";
  analysedStructureId: number;
  requestData: any;
}

// Interfaces para as entidades
export interface ProjectOption {
  id: number;
  name: string;
  description?: string;
  status?: string;
  progress?: number;
  startDate?: string;
  endDate?: string;
  manager?: string;
}

export interface BranchOption {
  id: number;
  address: string;
  phone?: string;
  email?: string;
  purpose?: string;
}

export interface DepartmentOption {
  id: number;
  name: string;
  description?: string;
  responsible?: string;
  totalEmployees?: number;
}

export interface CampaignOption {
  id: number;
  name: string;
  type?: string;
  status?: string;
  leads?: number;
  conversions?: number;
  roi?: number;
}

export interface FocusedAnalysisResponse {
  id: string;
  enterpriseId: number;
  analysisType: string;
  status: string;
  createdAt: string;
  completedAt?: string;
  results: {
    focusArea?: string;
    suggestions?: {
      title: string;
      description: string;
      priority: 'high' | 'medium' | 'low';
      implementationComplexity: 'high' | 'medium' | 'low';
      estimatedTimeframe: string;
    }[];
    insights?: string[];
    summary?: string;
  };
}

export interface FocusAreaOption {
  value: string;
  label: string;
  description: string;
  icon: string;
  dataFields: {
    name: string;
    label: string;
    type: 'text' | 'textarea' | 'number' | 'select' | 'json';
    placeholder?: string;
    options?: { value: string; label: string }[];
    required?: boolean;
    helperText?: string;
  }[];
  // Este campo será preenchido dinamicamente na interface
  analysedStructureId?: number;
}

export const FOCUS_AREAS: FocusAreaOption[] = [
  {
    value: 'projects',
    label: 'Projetos',
    description: 'Análise de um projeto específico da empresa',
    icon: '📊',
    dataFields: []
  },
  {
    value: 'branche',
    label: 'Filiais',
    description: 'Análise de uma filial específica da empresa',
    icon: '🏢',
    dataFields: []
  },
  {
    value: 'department',
    label: 'Departamentos',
    description: 'Análise de um departamento específico da empresa',
    icon: '👥',
    dataFields: []
  },
  {
    value: 'campaigns',
    label: 'Campanhas',
    description: 'Análise de uma campanha específica da empresa',
    icon: '📣',
    dataFields: []
  }
];

export const PRIORITY_COLORS = {
  high: 'text-red-600 bg-red-100',
  medium: 'text-yellow-600 bg-yellow-100',
  low: 'text-green-600 bg-green-100'
};

export const COMPLEXITY_COLORS = {
  high: 'text-red-600 bg-red-100',
  medium: 'text-yellow-600 bg-yellow-100',
  low: 'text-green-600 bg-green-100'
};