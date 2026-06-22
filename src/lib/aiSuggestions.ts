import { AISuggestion, DomainType, PlatformType } from './types';

export async function generateAISuggestions(
  platform: PlatformType,
  domain: DomainType
): Promise<AISuggestion> {
  const prompt = spark.llmPrompt`You are an expert product designer and developer. Based on the following platform and domain, suggest:

1. A comprehensive list of 8-12 essential features for this type of application
2. Three distinct theme design options (each with a design style and color mood)

Platform: ${platform}
Domain: ${domain}

Return ONLY a JSON object with this exact structure:
{
  "features": ["feature 1", "feature 2", ...],
  "designOptions": [
    {
      "designStyle": "modern|classic|playful|corporate|minimal",
      "colorMood": "vibrant|calm|professional|dark|colorful",
      "themeId": "theme-id-from-available-themes"
    }
  ]
}

Available theme IDs to choose from: aurora-borealis, neon-noir, minimalist, cosmic-latte, candy-shop, neutral, golden-hour, hacker-terminal, neobrutalism, high-contrast, ocean-depths, forest-canopy, sunset-gradient, lavender-fields, midnight-blue, cherry-blossom, desert-sand, arctic-ice, volcanic-ash, tropical-paradise

Make sure to provide 3 DIFFERENT designOptions that are well-suited to the domain. Choose theme IDs that match the design style and color mood.`;

  try {
    const response = await spark.llm(prompt, 'gemini-3.5-flash', true);
    const parsed = JSON.parse(response);
    return parsed;
  } catch (error) {
    return getFallbackSuggestions(domain);
  }
}

function getFallbackSuggestions(domain: DomainType): AISuggestion {
  const domainFeatures: Record<DomainType, string[]> = {
    finance: [
      'User authentication',
      'Dashboard with financial metrics',
      'Transaction history',
      'Budget tracking',
      'Payment integration',
      'Data visualization charts',
      'Export to CSV/PDF',
      'Multi-currency support',
      'Spending analytics',
      'Bill reminders',
    ],
    healthcare: [
      'Patient profiles',
      'Appointment scheduling',
      'Medical records management',
      'Prescription tracking',
      'Health metrics dashboard',
      'Doctor-patient messaging',
      'Lab results viewer',
      'Medication reminders',
      'Health insurance integration',
      'Telemedicine support',
    ],
    ecommerce: [
      'Product catalog',
      'Shopping cart',
      'Checkout flow',
      'Payment processing',
      'Order tracking',
      'User reviews and ratings',
      'Wishlist',
      'Product search and filters',
      'Inventory management',
      'Promotional discounts',
    ],
    education: [
      'Course catalog',
      'Enrollment system',
      'Video lessons',
      'Quiz and assessments',
      'Progress tracking',
      'Discussion forums',
      'Certificate generation',
      'Student dashboard',
      'Live classes',
      'Assignment submission',
    ],
    management: [
      'Project dashboard',
      'Task management',
      'Team collaboration',
      'File sharing',
      'Timeline/Gantt charts',
      'Time tracking',
      'Notifications',
      'Reporting and analytics',
      'Resource allocation',
      'Team chat',
    ],
    social: [
      'User profiles',
      'News feed',
      'Post creation (text, images, video)',
      'Like and comment system',
      'Friend/follow system',
      'Direct messaging',
      'Notifications',
      'Search users',
      'Privacy settings',
      'Content moderation',
    ],
    entertainment: [
      'Content library',
      'Media player',
      'Recommendations engine',
      'User playlists',
      'Ratings and reviews',
      'Search and filters',
      'Watchlist/queue',
      'User profiles',
      'Continue watching',
      'Social sharing',
    ],
    productivity: [
      'Task lists',
      'Calendar integration',
      'Note taking',
      'Reminders',
      'Tags and categories',
      'Search functionality',
      'Collaboration features',
      'File attachments',
      'Templates',
      'Keyboard shortcuts',
    ],
    travel: [
      'Destination search',
      'Booking system',
      'Itinerary planner',
      'Map integration',
      'Reviews and ratings',
      'Price comparison',
      'Travel guides',
      'Weather information',
      'Booking history',
      'Multi-language support',
    ],
    food: [
      'Restaurant/recipe search',
      'Menu display',
      'Online ordering',
      'Reservation system',
      'Reviews and ratings',
      'Dietary filters',
      'Favorite lists',
      'Delivery tracking',
      'Nutritional information',
      'Payment integration',
    ],
  };

  const domainThemes: Record<DomainType, AISuggestion['designOptions']> = {
    finance: [
      { designStyle: 'corporate', colorMood: 'professional', themeId: 'midnight-blue' },
      { designStyle: 'modern', colorMood: 'calm', themeId: 'ocean-depths' },
      { designStyle: 'minimal', colorMood: 'professional', themeId: 'neutral' },
    ],
    healthcare: [
      { designStyle: 'modern', colorMood: 'calm', themeId: 'arctic-ice' },
      { designStyle: 'minimal', colorMood: 'professional', themeId: 'minimalist' },
      { designStyle: 'corporate', colorMood: 'calm', themeId: 'ocean-depths' },
    ],
    ecommerce: [
      { designStyle: 'modern', colorMood: 'vibrant', themeId: 'aurora-borealis' },
      { designStyle: 'playful', colorMood: 'colorful', themeId: 'tropical-paradise' },
      { designStyle: 'minimal', colorMood: 'professional', themeId: 'minimalist' },
    ],
    education: [
      { designStyle: 'playful', colorMood: 'colorful', themeId: 'candy-shop' },
      { designStyle: 'modern', colorMood: 'vibrant', themeId: 'sunset-gradient' },
      { designStyle: 'minimal', colorMood: 'calm', themeId: 'lavender-fields' },
    ],
    management: [
      { designStyle: 'corporate', colorMood: 'professional', themeId: 'neutral' },
      { designStyle: 'modern', colorMood: 'professional', themeId: 'midnight-blue' },
      { designStyle: 'minimal', colorMood: 'calm', themeId: 'minimalist' },
    ],
    social: [
      { designStyle: 'playful', colorMood: 'vibrant', themeId: 'neon-noir' },
      { designStyle: 'modern', colorMood: 'colorful', themeId: 'aurora-borealis' },
      { designStyle: 'minimal', colorMood: 'vibrant', themeId: 'cherry-blossom' },
    ],
    entertainment: [
      { designStyle: 'modern', colorMood: 'dark', themeId: 'neon-noir' },
      { designStyle: 'playful', colorMood: 'vibrant', themeId: 'sunset-gradient' },
      { designStyle: 'minimal', colorMood: 'dark', themeId: 'volcanic-ash' },
    ],
    productivity: [
      { designStyle: 'minimal', colorMood: 'calm', themeId: 'minimalist' },
      { designStyle: 'modern', colorMood: 'professional', themeId: 'neutral' },
      { designStyle: 'corporate', colorMood: 'professional', themeId: 'ocean-depths' },
    ],
    travel: [
      { designStyle: 'modern', colorMood: 'vibrant', themeId: 'tropical-paradise' },
      { designStyle: 'playful', colorMood: 'colorful', themeId: 'golden-hour' },
      { designStyle: 'minimal', colorMood: 'calm', themeId: 'cosmic-latte' },
    ],
    food: [
      { designStyle: 'playful', colorMood: 'vibrant', themeId: 'golden-hour' },
      { designStyle: 'modern', colorMood: 'colorful', themeId: 'sunset-gradient' },
      { designStyle: 'minimal', colorMood: 'calm', themeId: 'cherry-blossom' },
    ],
  };

  return {
    features: domainFeatures[domain] || domainFeatures.productivity,
    designOptions: domainThemes[domain] || domainThemes.productivity,
  };
}
