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
  { id: 'user-auth', label: 'User Authentication (Email/Password)', category: 'authentication' },
  { id: 'social-login', label: 'Social Login (Google, Facebook, Apple)', category: 'authentication' },
  { id: 'two-factor', label: 'Two-Factor Authentication (2FA)', category: 'authentication' },
  { id: 'biometric-auth', label: 'Biometric Authentication (Face ID, Touch ID)', category: 'authentication' },
  { id: 'sso', label: 'Single Sign-On (SSO)', category: 'authentication' },
  { id: 'magic-link', label: 'Magic Link / Passwordless Login', category: 'authentication' },
  { id: 'session-management', label: 'Session Management & Auto-Logout', category: 'authentication' },
  { id: 'password-reset', label: 'Password Reset & Recovery', category: 'authentication' },
  { id: 'role-permissions', label: 'Role-Based Access Control (RBAC)', category: 'authentication' },
  
  { id: 'payment-gateway', label: 'Payment Processing (Stripe, PayPal)', category: 'payment' },
  { id: 'subscription', label: 'Subscription Management & Recurring Billing', category: 'payment' },
  { id: 'invoicing', label: 'Invoicing & Receipt Generation', category: 'payment' },
  { id: 'multi-currency', label: 'Multi-Currency Support', category: 'payment' },
  { id: 'refunds', label: 'Refunds & Cancellations', category: 'payment' },
  { id: 'payment-history', label: 'Payment History & Tracking', category: 'payment' },
  { id: 'promo-codes', label: 'Discount Codes & Promotions', category: 'payment' },
  { id: 'split-payment', label: 'Split Payments & Group Billing', category: 'payment' },
  
  { id: 'analytics-dashboard', label: 'Analytics Dashboard with KPIs', category: 'analytics' },
  { id: 'user-tracking', label: 'User Behavior & Activity Tracking', category: 'analytics' },
  { id: 'reporting', label: 'Custom Reports & Export to PDF/Excel', category: 'analytics' },
  { id: 'conversion-funnel', label: 'Conversion Funnel Analysis', category: 'analytics' },
  { id: 'ab-testing', label: 'A/B Testing & Experiments', category: 'analytics' },
  { id: 'heatmaps', label: 'Heatmaps & Click Tracking', category: 'analytics' },
  { id: 'cohort-analysis', label: 'Cohort Analysis & User Segmentation', category: 'analytics' },
  
  { id: 'realtime-chat', label: 'Real-time Chat & Messaging', category: 'realtime' },
  { id: 'live-updates', label: 'Live Data Updates & WebSocket Support', category: 'realtime' },
  { id: 'collaboration', label: 'Real-time Collaboration (Shared Editing)', category: 'realtime' },
  { id: 'video-calls', label: 'Video/Audio Calls & Conferencing', category: 'realtime' },
  { id: 'screen-sharing', label: 'Screen Sharing & Remote Control', category: 'realtime' },
  { id: 'presence-indicators', label: 'Online/Offline Status & Presence', category: 'realtime' },
  { id: 'typing-indicators', label: 'Typing Indicators & Read Receipts', category: 'realtime' },
  
  { id: 'user-profiles', label: 'User Profiles & Bio Pages', category: 'social' },
  { id: 'comments', label: 'Comments, Reviews & Ratings', category: 'social' },
  { id: 'share', label: 'Social Sharing (Facebook, Twitter, LinkedIn)', category: 'social' },
  { id: 'follow-system', label: 'Follow/Unfollow System', category: 'social' },
  { id: 'likes-favorites', label: 'Likes, Favorites & Bookmarks', category: 'social' },
  { id: 'activity-feed', label: 'Activity Feed & Timeline', category: 'social' },
  { id: 'mentions-tags', label: 'User Mentions & Tagging', category: 'social' },
  { id: 'private-messaging', label: 'Private Direct Messaging', category: 'social' },
  { id: 'user-verification', label: 'User Verification & Badges', category: 'social' },
  
  { id: 'image-upload', label: 'Image Upload, Crop & Gallery', category: 'media' },
  { id: 'video-streaming', label: 'Video Upload & Streaming', category: 'media' },
  { id: 'file-management', label: 'File Management & Cloud Storage', category: 'media' },
  { id: 'audio-player', label: 'Audio Player & Podcast Support', category: 'media' },
  { id: 'media-compression', label: 'Automatic Media Compression & Optimization', category: 'media' },
  { id: 'thumbnail-generation', label: 'Automatic Thumbnail Generation', category: 'media' },
  { id: 'media-library', label: 'Searchable Media Library', category: 'media' },
  { id: 'bulk-upload', label: 'Bulk Upload & Batch Processing', category: 'media' },
  
  { id: 'push-notifications', label: 'Push Notifications (Mobile & Web)', category: 'notification' },
  { id: 'email-notifications', label: 'Email Notifications & Templates', category: 'notification' },
  { id: 'sms-alerts', label: 'SMS Alerts & Text Messaging', category: 'notification' },
  { id: 'in-app-notifications', label: 'In-App Notification Center', category: 'notification' },
  { id: 'notification-preferences', label: 'Notification Preferences & Settings', category: 'notification' },
  { id: 'scheduled-notifications', label: 'Scheduled & Automated Notifications', category: 'notification' },
  { id: 'webhook-notifications', label: 'Webhook Notifications for Integrations', category: 'notification' },
  
  { id: 'advanced-search', label: 'Advanced Search with Filters', category: 'search' },
  { id: 'filters', label: 'Multi-Criteria Filters & Sorting', category: 'search' },
  { id: 'autocomplete', label: 'Search Autocomplete & Suggestions', category: 'search' },
  { id: 'full-text-search', label: 'Full-Text Search & Indexing', category: 'search' },
  { id: 'geo-search', label: 'Location-Based Search & Maps', category: 'search' },
  { id: 'voice-search', label: 'Voice Search Support', category: 'search' },
  { id: 'saved-searches', label: 'Saved Searches & Alerts', category: 'search' },
  
  { id: 'crud-operations', label: 'Create, Read, Update, Delete (CRUD) Operations', category: 'data' },
  { id: 'data-import-export', label: 'Data Import/Export (CSV, JSON, Excel)', category: 'data' },
  { id: 'bulk-operations', label: 'Bulk Edit & Batch Operations', category: 'data' },
  { id: 'data-validation', label: 'Form Validation & Data Integrity', category: 'data' },
  { id: 'versioning', label: 'Data Versioning & History', category: 'data' },
  { id: 'soft-delete', label: 'Soft Delete & Recovery', category: 'data' },
  { id: 'data-encryption', label: 'Data Encryption at Rest & in Transit', category: 'data' },
  
  { id: 'calendar-scheduling', label: 'Calendar & Event Scheduling', category: 'productivity' },
  { id: 'task-management', label: 'Task Management & To-Do Lists', category: 'productivity' },
  { id: 'kanban-board', label: 'Kanban Board & Project Tracking', category: 'productivity' },
  { id: 'time-tracking', label: 'Time Tracking & Timesheets', category: 'productivity' },
  { id: 'reminders', label: 'Reminders & Due Date Alerts', category: 'productivity' },
  { id: 'notes-documents', label: 'Notes & Document Management', category: 'productivity' },
  { id: 'team-collaboration', label: 'Team Collaboration & Workspaces', category: 'productivity' },
  
  { id: 'api-rest', label: 'RESTful API for Integrations', category: 'integration' },
  { id: 'api-graphql', label: 'GraphQL API Support', category: 'integration' },
  { id: 'webhooks', label: 'Webhooks for Real-time Events', category: 'integration' },
  { id: 'third-party-integrations', label: 'Third-Party Integrations (Zapier, etc.)', category: 'integration' },
  { id: 'oauth-provider', label: 'OAuth Provider for Third-Party Apps', category: 'integration' },
  { id: 'api-rate-limiting', label: 'API Rate Limiting & Throttling', category: 'integration' },
  
  { id: 'multi-language', label: 'Multi-Language Support (i18n)', category: 'localization' },
  { id: 'rtl-support', label: 'Right-to-Left (RTL) Language Support', category: 'localization' },
  { id: 'timezone-support', label: 'Timezone Detection & Conversion', category: 'localization' },
  { id: 'currency-formatting', label: 'Currency & Number Formatting', category: 'localization' },
  { id: 'date-formatting', label: 'Date & Time Formatting by Locale', category: 'localization' },
  
  { id: 'admin-panel', label: 'Admin Dashboard & Control Panel', category: 'admin' },
  { id: 'user-management', label: 'User Management & Moderation', category: 'admin' },
  { id: 'content-moderation', label: 'Content Moderation & Review Queue', category: 'admin' },
  { id: 'activity-logs', label: 'Activity Logs & Audit Trail', category: 'admin' },
  { id: 'system-settings', label: 'System Settings & Configuration', category: 'admin' },
  { id: 'backup-restore', label: 'Backup & Restore Functionality', category: 'admin' },
  
  { id: 'responsive-design', label: 'Fully Responsive Design (Mobile-First)', category: 'ui-ux' },
  { id: 'dark-mode', label: 'Dark Mode & Theme Switching', category: 'ui-ux' },
  { id: 'accessibility', label: 'Accessibility (WCAG 2.1 Compliance)', category: 'ui-ux' },
  { id: 'animations', label: 'Smooth Animations & Transitions', category: 'ui-ux' },
  { id: 'skeleton-loading', label: 'Skeleton Loading States', category: 'ui-ux' },
  { id: 'infinite-scroll', label: 'Infinite Scroll & Pagination', category: 'ui-ux' },
  { id: 'drag-drop', label: 'Drag & Drop Interface', category: 'ui-ux' },
  { id: 'offline-mode', label: 'Offline Mode & Progressive Web App (PWA)', category: 'ui-ux' },
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
  { id: 'data', label: 'Data Management' },
  { id: 'productivity', label: 'Productivity & Organization' },
  { id: 'integration', label: 'API & Integrations' },
  { id: 'localization', label: 'Localization & i18n' },
  { id: 'admin', label: 'Admin & Management' },
  { id: 'ui-ux', label: 'UI/UX Enhancements' },
];
