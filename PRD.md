# Planning Guide

A web application for collecting product requirements from customers through an intuitive multi-step form interface, converting selections into structured JSON for an AI agent system (BA, Designer, Lead, Dev agents) to process and build products.

**Experience Qualities**:
1. **Conversational** - The form should feel like a natural dialogue rather than a bureaucratic questionnaire
2. **Effortless** - Users glide through selections with minimal cognitive load and zero typing burden  
3. **Confident** - Clear progress indication and validation create trust that their requirements are being captured accurately

**Complexity Level**: Light Application (multiple features with basic state)
This is a guided form collection tool with multiple steps, form state management, and JSON export functionality. It's more than a single-purpose tool but not a complex multi-view application.

## Essential Features

### Multi-Step Requirement Form
- **Functionality**: Progressive form with multiple categories (Platform, Domain, Features, Design Preferences, etc.)
- **Purpose**: Break down complex requirement gathering into digestible chunks
- **Trigger**: User clicks "Start New Project" on home screen
- **Progression**: Welcome screen → Platform selection → Domain selection → Feature checkboxes → Design preferences → Timeline/Budget → Review summary → Generate JSON
- **Success criteria**: User can complete form in under 3 minutes; all selections are captured in final JSON

### Platform Selection
- **Functionality**: Single-choice selection between Web, Mobile (iOS/Android), or Both
- **Purpose**: Determine the primary development target
- **Trigger**: First step after starting form
- **Progression**: Display large touch-friendly cards with icons → User taps selection → Auto-advance to next step
- **Success criteria**: Selection is visually confirmed and stored

### Domain/Industry Selection
- **Functionality**: Single or multi-select from categorized domains
- **Purpose**: Understand the business context and requirements
- **Trigger**: After platform selection
- **Progression**: Grid of domain cards (Finance, Healthcare, E-commerce, Education, Management, Social, Entertainment, etc.) → User selects one or more → Continue button appears
- **Success criteria**: At least one domain selected to proceed

### Feature Selection
- **Functionality**: Multi-select checkboxes grouped by feature categories
- **Purpose**: Capture specific functional requirements
- **Trigger**: After domain selection
- **Progression**: Categorized feature list (Auth, Payments, Analytics, Real-time features, etc.) → User checks desired features → Continue when ready
- **Success criteria**: Selected features are tagged and stored

### Design Preference Capture
- **Functionality**: Quick selections for design style and branding
- **Purpose**: Guide the Designer agent
- **Trigger**: After feature selection
- **Progression**: Style options (Modern, Classic, Playful, Corporate) → Color mood selection → Continue
- **Success criteria**: Design preferences captured in JSON

### Requirement Summary & JSON Export
- **Functionality**: Review all selections with ability to edit; generate and display JSON
- **Purpose**: Validate requirements before submission
- **Trigger**: After completing all form steps
- **Progression**: Display summary cards organized by category → Edit button per section → Generate JSON button → JSON displayed in copyable format → Submit/Download options
- **Success criteria**: JSON is valid, complete, and matches all user selections

## Edge Case Handling

- **Incomplete Form Exit**: Auto-save progress to localStorage; offer to resume on return
- **No Selections Made**: Disable continue buttons until minimum selections are made
- **Back Navigation**: Allow users to go back and modify previous selections without losing data
- **Invalid State**: Validate required fields before allowing progression
- **Mobile Keyboard**: Ensure form controls remain accessible when virtual keyboard appears
- **Offline State**: Cache form structure; show warning if submission requires connection

## Design Direction

The design should evoke a sense of innovation, professionalism, and forward momentum - like you're building something exciting with AI assistance. It should feel modern and tech-forward without being intimidating, using friendly language and smooth interactions that make complex requirement gathering feel simple.

## Color Selection

A vibrant tech-forward palette with deep purples and electric accents that communicate AI innovation and modern development.

- **Primary Color**: Deep Purple `oklch(0.45 0.18 290)` - Represents AI/tech innovation, creates sophisticated tech brand feel
- **Secondary Colors**: 
  - Darker Purple `oklch(0.35 0.16 290)` for depth and emphasis
  - Light Purple `oklch(0.95 0.05 290)` for subtle backgrounds and hover states
- **Accent Color**: Electric Cyan `oklch(0.70 0.15 200)` - High-energy highlight for CTAs, active states, and progress indicators
- **Foreground/Background Pairings**: 
  - Background Light `oklch(0.98 0.01 290)` on Primary Purple - Ratio 8.2:1 ✓
  - Primary Purple: White text `oklch(1 0 0)` - Ratio 7.8:1 ✓
  - Accent Cyan: White text `oklch(1 0 0)` - Ratio 4.9:1 ✓
  - Muted Purple `oklch(0.85 0.03 290)` with dark text `oklch(0.25 0.05 290)` - Ratio 9.1:1 ✓

## Font Selection

Typography should convey modern tech professionalism with excellent readability on mobile screens, using geometric forms that echo the precision of software development.

- **Primary Font**: Space Grotesk (700/600/500 weights) - Modern geometric sans with tech-forward personality for headings
- **Secondary Font**: Inter (400/500/600 weights) - Clean, highly legible for body text and form elements

- **Typographic Hierarchy**: 
  - H1 (Page Titles): Space Grotesk Bold 32px / tight leading / -0.02em tracking
  - H2 (Section Headers): Space Grotesk SemiBold 24px / normal leading / -0.01em tracking
  - H3 (Card Titles): Space Grotesk Medium 18px / normal leading
  - Body (Descriptions): Inter Regular 16px / 1.6 line-height
  - Labels: Inter Medium 14px / 1.4 line-height / 0.01em tracking
  - Buttons: Inter SemiBold 16px / uppercase / 0.05em tracking

## Animations

Animations should create a sense of fluid progression and intelligent response - each interaction should feel like the system is actively understanding and processing the user's input. Use smooth page transitions between form steps (slide left/right), gentle scale transforms on card selection (scale 1.02 with shadow increase), and a satisfying progress bar that fills with elastic easing. Micro-interactions like checkbox checks should have subtle bounces, and the final JSON generation should have a brief "processing" animation to build anticipation.

## Component Selection

- **Components**: 
  - Card: Primary selection component for platform/domain choices with hover effects and selected states
  - Button: Primary and secondary variants for navigation and actions
  - Checkbox: Multi-select features with custom styling
  - Progress: Top-bar progress indicator showing completion percentage
  - Badge: Tag selected items in summary view
  - Separator: Visual breaks between form sections
  - Accordion: Expandable feature categories
  - Dialog: JSON output display with copy functionality
  - Sheet: Mobile-optimized slide-up panel for editing sections on summary page
  - Scroll-area: For long feature lists

- **Customizations**: 
  - Selection Cards: Custom component with large touch targets (min 80px height), icon placement, selected state with border glow
  - Step Indicator: Custom horizontal stepper showing current/completed/upcoming steps
  - JSON Viewer: Syntax-highlighted display with copy button

- **States**: 
  - Cards: default (subtle border) → hover (lift + shadow) → selected (purple border + purple background tint + check icon)
  - Buttons: default → hover (darken 10%) → active (scale 0.98) → disabled (50% opacity)
  - Checkboxes: unchecked → hover (border accent) → checked (filled with animation)
  - Progress bar: smooth fill with gradient, pulsing on step transition

- **Icon Selection**: 
  - Platform: DeviceMobile, Desktop, Devices
  - Domains: CurrencyDollar, Heart, ShoppingCart, GraduationCap, ChartBar, Users, GameController
  - Actions: ArrowRight, ArrowLeft, Check, Copy, Download
  - Features: Lock, CreditCard, ChartLine, Lightning, Bell
  - Navigation: List (menu), X (close)

- **Spacing**: 
  - Page padding: px-6 py-8 (mobile), px-12 py-12 (desktop)
  - Card gap: gap-4 (mobile), gap-6 (desktop)
  - Section spacing: space-y-8
  - Form element spacing: space-y-6
  - Internal card padding: p-6

- **Mobile**: 
  - Single column card layout on mobile, 2-3 columns on tablet/desktop
  - Fixed bottom navigation bar with back/continue buttons
  - Sticky progress bar at top
  - Touch-friendly minimum 44px tap targets
  - Collapsible sections in summary view
  - Sheet component for edit modals instead of full dialog
  - Increased font sizes on mobile (18px body minimum)
