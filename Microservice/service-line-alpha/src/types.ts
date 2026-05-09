export interface ServiceConfig {
  id: string;
  domain: Domain;
  port: number;
  host: string;
}

export type Domain = 'advisory' | 'marketing' | 'technology' | 'engineering';

export interface TaskData {
  taskId: string;
  domain: Domain;
  operation: string;
  parameters: Record<string, string>;
  priority: number;
  requesterId: string;
}

export interface ResponseData {
  taskId: string;
  success: boolean;
  message: string;
  data: Record<string, string>;
  timestamp: number;
}

export interface ServiceCapabilities {
  advisory: string[];
  marketing: string[];
  technology: string[];
  engineering: string[];
}

export const CAPABILITIES: ServiceCapabilities = {
  advisory: [
    'market_research',
    'strategic_analysis',
    'competitive_intelligence',
    'risk_assessment'
  ],
  marketing: [
    'content_creation',
    'campaign_management',
    'seo_optimization',
    'social_media_strategy'
  ],
  technology: [
    'data_processing',
    'system_integration',
    'api_development',
    'performance_optimization'
  ],
  engineering: [
    'code_review',
    'security_analysis',
    'architecture_design',
    'quality_assurance'
  ]
};
