import { 
  DomainType, 
  Feature, 
  DesignStyle, 
  ColorMood,
  PlatformType 
} from './types';

export const PLATFORMS: { value: PlatformType; label: string; description: string }[] = [
  { 
    value: 'web', 
    label: 'Web Application', 
    description: 'Browser-based responsive website' 
  },
  { 
    value: 'mobile-ios', 
    label: 'iOS App', 
    description: 'Native iPhone/iPad application' 
  },
  { 
    value: 'mobile-android', 
    label: 'Android App', 
    description: 'Native Android application' 
  },
  { 
    value: 'both', 
    label: 'Cross-Platform', 
    description: 'Web + Mobile applications' 
  },
];

export const DOMAINS: { value: DomainType; label: string; description: string }[] = [
  { value: 'finance', label: 'Finance', description: 'Banking, trading, crypto' },
  { value: 'healthcare', label: 'Healthcare', description: 'Medical, wellness, fitness' },
  { value: 'ecommerce', label: 'E-Commerce', description: 'Online shopping, marketplace' },
  { value: 'education', label: 'Education', description: 'Learning, courses, training' },
  { value: 'management', label: 'Management', description: 'Business tools, CRM, ERP' },
  { value: 'social', label: 'Social', description: 'Community, networking, chat' },
  { value: 'entertainment', label: 'Entertainment', description: 'Media, gaming, streaming' },
  { value: 'productivity', label: 'Productivity', description: 'Tasks, notes, time tracking' },
  { value: 'travel', label: 'Travel', description: 'Booking, maps, itineraries' },
  { value: 'food', label: 'Food & Dining', description: 'Restaurants, delivery, recipes' },
];

export const FEATURES: Feature[] = [
  { id: 'user-auth', label: 'User Authentication', category: 'authentication' },
  { id: 'social-login', label: 'Social Login (Google, Facebook)', category: 'authentication' },
  { id: 'two-factor', label: 'Two-Factor Authentication', category: 'authentication' },
  
  { id: 'payment-gateway', label: 'Payment Processing', category: 'payment' },
  { id: 'subscription', label: 'Subscription Management', category: 'payment' },
  { id: 'invoicing', label: 'Invoicing System', category: 'payment' },
  
  { id: 'analytics-dashboard', label: 'Analytics Dashboard', category: 'analytics' },
  { id: 'user-tracking', label: 'User Behavior Tracking', category: 'analytics' },
  { id: 'reporting', label: 'Custom Reports', category: 'analytics' },
  
  { id: 'realtime-chat', label: 'Real-time Chat', category: 'realtime' },
  { id: 'live-updates', label: 'Live Data Updates', category: 'realtime' },
  { id: 'collaboration', label: 'Real-time Collaboration', category: 'realtime' },
  
  { id: 'user-profiles', label: 'User Profiles', category: 'social' },
  { id: 'comments', label: 'Comments & Reviews', category: 'social' },
  { id: 'share', label: 'Social Sharing', category: 'social' },
  
  { id: 'image-upload', label: 'Image Upload & Gallery', category: 'media' },
  { id: 'video-streaming', label: 'Video Streaming', category: 'media' },
  { id: 'file-management', label: 'File Management', category: 'media' },
  
  { id: 'push-notifications', label: 'Push Notifications', category: 'notification' },
  { id: 'email-notifications', label: 'Email Notifications', category: 'notification' },
  { id: 'sms-alerts', label: 'SMS Alerts', category: 'notification' },
  
  { id: 'advanced-search', label: 'Advanced Search', category: 'search' },
  { id: 'filters', label: 'Filters & Sorting', category: 'search' },
  { id: 'autocomplete', label: 'Search Autocomplete', category: 'search' },
];

export const DESIGN_STYLES: { value: DesignStyle; label: string; description: string }[] = [
  { value: 'modern', label: 'Modern', description: 'Clean, minimal, contemporary' },
  { value: 'classic', label: 'Classic', description: 'Timeless, elegant, traditional' },
  { value: 'playful', label: 'Playful', description: 'Fun, colorful, creative' },
  { value: 'corporate', label: 'Corporate', description: 'Professional, formal, business' },
  { value: 'minimal', label: 'Minimal', description: 'Simple, focused, essential' },
];

export const COLOR_MOODS: { value: ColorMood; label: string; description: string }[] = [
  { value: 'vibrant', label: 'Vibrant', description: 'Bold, energetic colors' },
  { value: 'calm', label: 'Calm', description: 'Soft, peaceful tones' },
  { value: 'professional', label: 'Professional', description: 'Blues, grays, neutrals' },
  { value: 'dark', label: 'Dark Mode', description: 'Dark background, light text' },
  { value: 'colorful', label: 'Colorful', description: 'Multi-color palette' },
];

export const FEATURE_CATEGORIES = [
  { id: 'authentication', label: 'Authentication & Security' },
  { id: 'payment', label: 'Payment & Billing' },
  { id: 'analytics', label: 'Analytics & Reporting' },
  { id: 'realtime', label: 'Real-time Features' },
  { id: 'social', label: 'Social Features' },
  { id: 'media', label: 'Media & Files' },
  { id: 'notification', label: 'Notifications' },
  { id: 'search', label: 'Search & Discovery' },
];
