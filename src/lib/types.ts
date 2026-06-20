export type PlatformType = 'web' | 'mobile-ios' | 'mobile-android' | 'both';

export type DomainType = 
  | 'finance' 
  | 'healthcare' 
  | 'ecommerce' 
  | 'education' 
  | 'management' 
  | 'social' 
  | 'entertainment'
  | 'productivity'
  | 'travel'
  | 'food';

export type FeatureCategory = 
  | 'authentication'
  | 'payment'
  | 'analytics'
  | 'realtime'
  | 'social'
  | 'media'
  | 'notification'
  | 'search';

export type DesignStyle = 'modern' | 'classic' | 'playful' | 'corporate' | 'minimal';

export type ColorMood = 'vibrant' | 'calm' | 'professional' | 'dark' | 'colorful';

export interface Feature {
  id: string;
  label: string;
  category: FeatureCategory;
}

export interface ProjectRequirements {
  platform: PlatformType | null;
  domains: DomainType[];
  features: string[];
  designStyle: DesignStyle | null;
  colorMood: ColorMood | null;
  themeId: string | null;
  timeline?: string;
  budget?: string;
  additionalNotes?: string;
}

export interface FormStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}
