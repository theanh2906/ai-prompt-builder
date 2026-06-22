# Planning Guide

A prompt builder tool that helps developers construct high-quality, comprehensive prompts for AI code generation agents, ensuring at least 70% accuracy in generating the expected output. Features dual-mode building (AI-assisted and Expert), user authentication, and saved prompt management.

**Experience Qualities**: 
1. **Precise** - Every selection contributes to a specific, actionable prompt element that directly influences code generation
2. **Visual** - Theme cards with color mockups allow users to see what their color choices will represent
3. **Efficient** - Streamlined multi-step process guides users from concept to complete prompt in minutes, with AI mode making it even faster
4. **Personal** - Authentication and saved prompts let users build a library of reusable prompts

**Complexity Level**: Complex Application (advanced functionality with multiple views)
This application includes user authentication via OAuth providers, persistent data storage per user, dual-mode workflows (AI-suggested vs Expert), and prompt management features including save, edit, and delete operations.

## Essential Features

### User Authentication
- **Functionality**: OAuth-based login supporting Google, Facebook, and LinkedIn
- **Purpose**: Secure user identification for persisting saved prompts across sessions
- **Trigger**: User clicks login button or attempts to save a prompt
- **Progression**: Login button click → Provider selection modal → OAuth flow → Redirect back → User authenticated
- **Success criteria**: User can log in with any supported provider, session persists across page refreshes, logout works correctly

### Dual-Mode Builder System
- **Functionality**: Two distinct workflows - AI Suggest mode (platform + domain → AI generates features/themes) and Expert mode (manual step-by-step configuration)
- **Purpose**: AI mode accelerates prompt creation for common use cases; Expert mode provides full control for specific requirements
- **Trigger**: User selects mode on welcome screen after authentication
- **Progression**: Mode selection → AI: 2 steps (platform, domain) / Expert: 6 steps (full wizard) → Generate prompt
- **Success criteria**: AI mode completes in 2 steps with 3 design suggestions; Expert mode provides full granular control

### AI-Suggested Features & Themes
- **Functionality**: Based on platform + domain selection, AI suggests relevant features and generates 3 distinct theme/design combinations with visual previews
- **Purpose**: Eliminates decision fatigue and provides professional starting points
- **Trigger**: User completes platform and domain selection in AI Suggest mode
- **Progression**: Platform + domain selected → AI analyzes → Returns features list + 3 theme options → User picks one → Generate
- **Success criteria**: AI returns results within 3 seconds, suggestions are relevant to domain, 3 distinct themes with styled preview cards

### Multi-Step Requirement Collection (Expert Mode)
- **Functionality**: Guided wizard interface collecting platform, domain, features, and design preferences
- **Purpose**: Structures user input into organized sections that map to prompt components
- **Trigger**: User selects Expert mode
- **Progression**: Platform selection → Domain selection → Features selection → Design style → Theme selection → Summary/Generate
- **Success criteria**: Users can navigate forward/backward, selections persist, progress indicator shows current position

### Theme Selection System (20 Presets)
- **Functionality**: Visual theme selector with 20 pre-configured color palettes, shown as styled mockup cards
- **Purpose**: Provides professional, tested color combinations that users can specify in their prompt
- **Trigger**: User reaches theme selection step (Expert mode) or reviews AI suggestions (AI mode)
- **Progression**: User views theme grid → Selects theme → Sees theme details on card → Confirms selection
- **Success criteria**: Theme cards show accurate color representation; selected theme is included in final prompt

### Prompt Generation Engine
- **Functionality**: Converts all user selections into a comprehensive, structured prompt optimized for AI code generators
- **Purpose**: Transforms structured data into natural language instructions that achieve 70%+ accuracy
- **Trigger**: User clicks "Generate Prompt" on summary screen
- **Progression**: Collect all selections → Format into sections → Include theme specifics → Generate complete prompt → Display in modal
- **Success criteria**: Generated prompt is copy-ready, includes all selections, follows best practices for AI prompting

### Save & Manage Prompts
- **Functionality**: Save generated prompts with custom names, view saved prompts library, edit/regenerate, and delete prompts
- **Purpose**: Build reusable prompt library for common project types
The design should feel like a professional developer tool - clean, efficient, and trustworthy. It should communicate precision and capability while remaining approachable. The interface should feel modern and aligned with contemporary development tools, with subtle animations that guide attention without distraction.

- **Success criteria**: Prompts persist per user account, can be loaded and edited, deletions are confirmed

### Prompt Output Actions
- **Functionality**: Copy to clipboard and download as .md options for generated prompt
- **Purpose**: Easy export of final prompt for use in any AI code generation tool
- **Trigger**: User views generated prompt in modal
- **Progression**: Prompt displayed → User clicks Copy/Download → Confirmation feedback → Prompt ready to use
- **Success criteria**: Copy works across browsers, download creates properly formatted .md file, toast confirmation appears

## Edge Case Handling

- **No selections made**: Continue button disabled until minimum requirements met for each step
- **Unauthenticated user tries to save**: Prompt login modal, redirect to auth flow, return to save after login
- **AI suggestion timeout**: Show fallback generic features, allow manual selection
- **Saved prompts limit**: No artificial limit (uses Spark KV storage per user)
- **Network failures during OAuth**: Show error message, provide retry button
- **Very long feature lists**: Scroll container with max height, clear visual indication of scrollable area
- **Mobile viewport**: Theme cards adapt to single column, mode selector stacks vertically
- **Duplicate prompt names**: Allow duplicates but show creation timestamp for differentiation
- **Deleted OAuth provider account**: User can't log in; show error message suggesting alternative provider

## Design Direction

The design should feel like a professional developer tool - clean, efficient, and trustworthy. It should communicate precision and capability while remaining approachable. The interface should feel modern and aligned with contemporary development tools, with subtle animations that guide attention without distraction.

## Color Selection

A sophisticated, developer-focused palette with high contrast and clear visual hierarchy.

- **Primary Color**: Deep cyan `oklch(0.55 0.18 195)` - Communicates technology, precision, and trust. Used for CTAs and active states.
- **Secondary Colors**: Slate gray `oklch(0.88 0.01 240)` for secondary actions; warm gray `oklch(0.45 0.01 240)` for muted text
- **Accent Color**: Electric violet `oklch(0.65 0.25 285)` - Attention-grabbing highlight for interactive elements, selected states, and theme preview borders
- **Foreground/Background Pairings**: 
  - Primary (Deep Cyan oklch(0.55 0.18 195)): White text (oklch(0.99 0 0)) - Ratio 7.2:1 ✓
  - Accent (Electric Violet oklch(0.65 0.25 285)): White text (oklch(0.99 0 0)) - Ratio 6.8:1 ✓
  - Background (Soft White oklch(0.98 0.005 240)): Dark text (oklch(0.20 0.01 240)) - Ratio 14.1:1 ✓
  - Card (Pure White oklch(1.0 0 0)): Dark text (oklch(0.20 0.01 240)) - Ratio 16.5:1 ✓

## Font Selection

Typography should feel technical yet accessible, with excellent readability for both UI elements and code-like content (prompt output).

- **Typographic Hierarchy**: 
  - H1 (Page Title): Space Grotesk Bold / 36px / tight tracking (-0.02em)
  - H2 (Step Titles): Space Grotesk Semibold / 28px / tight tracking
  - H3 (Section Headers): Space Grotesk Medium / 20px / normal tracking
  - Body (Descriptions): Inter Regular / 16px / relaxed line-height (1.6)
  - Code/Prompt Output: JetBrains Mono Regular / 14px / normal line-height (1.5)
  - Button Text: Inter Semibold / 15px / slight tracking (0.01em)

## Animations

Animations should emphasize state transitions and guide users through the multi-step flow. Keep animations quick (200-300ms) to maintain the efficient, professional feel.

- **Step transitions**: Subtle slide + fade (300ms ease-out) when moving between wizard steps
- **Theme selection**: Scale + glow effect (150ms) on hover, quick snap to selected state with checkmark fade-in
- **Preview updates**: Smooth color transition (200ms) when theme changes, avoiding jarring instant switches
- **Button interactions**: Micro-scale on press (100ms), ripple effect for primary actions
- **Modal entry**: Backdrop fade + content slide-up (250ms) for prompt display dialog

## Component Selection

- **Components**: 
  - `Dialog` for prompt output modal with copy/download actions
  - `Card` for theme selection tiles, step containers, and preview window
  - `Button` with primary variant for Continue/Generate, outline for Back/secondary actions
  - `Progress` component customized for multi-step wizard indicator
  - `Input` with search icon for theme filtering
  - `Badge` for displaying selected features/domains count
  - `ScrollArea` for long feature lists and theme grid
  - `Separator` to divide sections within steps
  - `Tooltip` for theme names on hover
  
- **Customizations**: 
  - Theme preview card: Custom component showing live color swatches + mini UI elements (buttons, inputs) rendered with theme
  - Prompt output display: Custom formatted text block with syntax-style highlighting for better readability
  - Step progress indicator: Custom horizontal stepper with connecting lines and completion checkmarks
  
- **States**: 
  - Buttons: Distinct hover (lift + shadow), active (press down), disabled (low opacity + no interaction)
  - Theme cards: Default (subtle border), hover (border glow + scale 1.02), selected (thick accent border + checkmark badge)
  - Inputs: Focus ring with accent color, error state with red border (if validation added later)
  
- **Icon Selection**: 
  - `Sparkles` for generate/AI-related actions
  - `Copy` and `Download` for prompt output actions
  - `Check` for completion states and confirmations
  - `MagnifyingGlass` for theme search
  - `CaretLeft/Right` for navigation
  - `Palette` for theme-related indicators
  
- **Spacing**: 
  - Consistent 4px base unit: 16px (4) for component padding, 24px (6) for section gaps, 32px (8) for major layout divisions
  - Wizard container: 48px (12) vertical padding, 32px (8) horizontal
  - Theme grid: 16px (4) gap between cards
  
- **Mobile**: 
  - Theme grid: 2 columns on mobile (<640px), 4 columns on tablet (640-1024px), 5 columns on desktop (>1024px)
  - Preview window: Stacks below theme selector on mobile, side-by-side on tablet+
  - Step navigation: Full-width buttons on mobile with reduced padding
  - Wizard progress: Compress to dots-only on very small screens (<375px)
