import { ProjectRequirements } from './types';
import { getThemeById } from './themes';

export function generatePrompt(requirements: ProjectRequirements): string {
  const sections: string[] = [];

  sections.push('# Web Application Development Prompt\n');
  sections.push('Please build a complete, production-ready web application based on the following detailed specifications:\n');

  if (requirements.platform) {
    sections.push('## Platform');
    const platformMap: Record<string, string> = {
      'web': 'Web Application (Desktop & Mobile Responsive)',
      'mobile-ios': 'iOS Mobile Application',
      'mobile-android': 'Android Mobile Application',
      'both': 'Cross-Platform Mobile Application (iOS & Android)',
    };
    sections.push(platformMap[requirements.platform] || requirements.platform);
    sections.push('');
  }

  if (requirements.domains && requirements.domains.length > 0) {
    sections.push('## Domain & Industry');
    sections.push('This application serves the following domains:');
    requirements.domains.forEach((domain) => {
      const domainMap: Record<string, string> = {
        'finance': 'Finance - Financial services, banking, investing, or budgeting',
        'healthcare': 'Healthcare - Medical services, patient management, or health tracking',
        'ecommerce': 'E-commerce - Online shopping, product catalog, or marketplace',
        'education': 'Education - Learning management, courses, or educational content',
        'management': 'Management - Project management, task tracking, or workflow automation',
        'social': 'Social - Social networking, community building, or collaboration',
        'entertainment': 'Entertainment - Media streaming, gaming, or content discovery',
        'productivity': 'Productivity - Tools for efficiency, organization, or time management',
        'travel': 'Travel - Trip planning, booking, or travel information',
        'food': 'Food & Beverage - Recipes, restaurant discovery, or food ordering',
      };
      sections.push(`- ${domainMap[domain] || domain}`);
    });
    sections.push('');
  }

  if (requirements.features && requirements.features.length > 0) {
    sections.push('## Core Features & Functionality');
    sections.push('Implement the following features:');
    requirements.features.forEach((feature) => {
      sections.push(`- ${feature}`);
    });
    sections.push('');
  }

  if (requirements.designStyle) {
    sections.push('## Design Style');
    const styleMap: Record<string, string> = {
      'modern': 'Modern - Clean lines, contemporary aesthetics, bold typography, and ample white space',
      'classic': 'Classic - Timeless design with traditional elements, refined typography, and sophisticated layout',
      'playful': 'Playful - Fun, energetic, colorful with rounded corners and friendly interactions',
      'corporate': 'Corporate - Professional, trustworthy, structured layout with business-focused design',
      'minimal': 'Minimal - Stripped-down essentials, maximum white space, focus on content over decoration',
    };
    sections.push(styleMap[requirements.designStyle] || requirements.designStyle);
    sections.push('');
  }

  if (requirements.colorMood) {
    sections.push('## Color Mood');
    const moodMap: Record<string, string> = {
      'vibrant': 'Vibrant - High energy, saturated colors, bold and attention-grabbing',
      'calm': 'Calm - Soothing, muted tones, relaxing and peaceful atmosphere',
      'professional': 'Professional - Refined, business-appropriate colors that convey trust and competence',
      'dark': 'Dark - Dark mode aesthetic with light text on dark backgrounds',
      'colorful': 'Colorful - Rich variety of colors, diverse palette, expressive and dynamic',
    };
    sections.push(moodMap[requirements.colorMood] || requirements.colorMood);
    sections.push('');
  }

  if (requirements.themeId) {
    const theme = getThemeById(requirements.themeId);
    if (theme) {
      sections.push('## Color Palette (Exact Theme Specifications)');
      sections.push(`Theme Name: ${theme.name}`);
      sections.push(`Description: ${theme.description}`);
      sections.push('');
      sections.push('Use these exact OKLCH color values in your CSS/design:');
      sections.push('');
      sections.push('```css');
      sections.push(':root {');
      sections.push(`  --primary: ${theme.colors.primary};`);
      sections.push(`  --secondary: ${theme.colors.secondary};`);
      sections.push(`  --accent: ${theme.colors.accent};`);
      sections.push(`  --background: ${theme.colors.background};`);
      sections.push(`  --foreground: ${theme.colors.foreground};`);
      sections.push(`  --card: ${theme.colors.card};`);
      sections.push(`  --border: ${theme.colors.border};`);
      sections.push(`  --muted: ${theme.colors.muted};`);
      sections.push('}');
      sections.push('```');
      sections.push('');
      sections.push('Color Usage Guidelines:');
      sections.push('- Primary: Main action buttons, key interactive elements, brand identity');
      sections.push('- Secondary: Supporting buttons, less prominent actions');
      sections.push('- Accent: Highlights, hover states, selected items, important callouts');
      sections.push('- Background: Main page background color');
      sections.push('- Foreground: Primary text color on background');
      sections.push('- Card: Background for card/panel components');
      sections.push('- Border: Borders, dividers, separators');
      sections.push('- Muted: Disabled states, placeholder text, less important content');
      sections.push('');
    }
  }

  sections.push('## Technical Implementation Requirements');
  sections.push('');
  sections.push('### Framework & Stack');
  sections.push('- Use modern React with TypeScript');
  sections.push('- Implement responsive design (mobile-first approach)');
  sections.push('- Use Tailwind CSS for styling');
  sections.push('- Ensure accessibility (WCAG AA compliance)');
  sections.push('');
  sections.push('### Code Quality');
  sections.push('- Write clean, maintainable, well-documented code');
  sections.push('- Use modern ES6+ JavaScript features');
  sections.push('- Implement proper error handling');
  sections.push('- Follow React best practices (hooks, component composition)');
  sections.push('');
  sections.push('### User Experience');
  sections.push('- Smooth animations and transitions (200-300ms)');
  sections.push('- Loading states for async operations');
  sections.push('- Clear error messages and validation feedback');
  sections.push('- Intuitive navigation and information architecture');
  sections.push('');
  sections.push('### Performance');
  sections.push('- Optimize for fast initial load time');
  sections.push('- Lazy load components where appropriate');
  sections.push('- Minimize bundle size');
  sections.push('- Implement efficient state management');
  sections.push('');

  sections.push('## Deliverables');
  sections.push('Provide a complete, working application that includes:');
  sections.push('1. All component files with proper structure and organization');
  sections.push('2. Fully styled UI matching the theme and design specifications');
  sections.push('3. Responsive layouts that work on desktop, tablet, and mobile');
  sections.push('4. All specified features implemented and functional');
  sections.push('5. Clear code comments explaining complex logic');
  sections.push('');

  sections.push('## Success Criteria');
  sections.push('The application should:');
  sections.push('- Match the specified color theme exactly');
  sections.push('- Implement all requested features');
  sections.push('- Be fully responsive across all screen sizes');
  sections.push('- Have smooth, professional interactions and animations');
  sections.push('- Follow modern web development best practices');
  sections.push('- Be production-ready and deployable');

  return sections.join('\n');
}
