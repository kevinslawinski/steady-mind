// ========================================
// Application Constants
// ========================================
export const APP_TITLE = 'Steady Mind';
export const WELCOME_TEXT_OLD =
  "Let's take this one step at a time. Answer a couple of gentle questions, and we'll help you find what might work for you right now.";
export const WELCOME_TEXT = 'One step at a time.';

// ========================================
// Type Definitions
// ========================================

export type EmotionTag =
  | 'anxiety'
  | 'stress'
  | 'overwhelm'
  | 'sadness'
  | 'panic'
  | 'racing-thoughts'
  | 'general';

export type StrategyCategory =
  | 'breathing'
  | 'grounding'
  | 'mindfulness'
  | 'meditation'
  | 'cognitive'
  | 'physical';

export type DifficultyLevel = 'easy' | 'medium' | 'challenging';

export interface CopingStrategy {
  id: string;
  name: string;
  description: string;
  category: StrategyCategory;
  emotionTags: EmotionTag[];
  steps: string[];
  estimatedMinutes: number;
  difficulty: DifficultyLevel;
  isDefault: boolean;
}

export interface GuidedPromptQuestion {
  id: number;
  question: string;
  options: GuidedPromptOption[];
}

export interface GuidedPromptOption {
  value: string;
  label: string;
  emoji: string;
  emotionTags?: EmotionTag[];
}

// ========================================
// Guided Prompts Data
// ========================================

export const GUIDED_QUESTIONS: GuidedPromptQuestion[] = [
  {
    id: 0,
    question: 'How are you feeling right now?',
    options: [
      {
        value: 'overwhelmed',
        label: 'Overwhelmed',
        emoji: '😰',
        emotionTags: ['overwhelm', 'stress'],
      },
      {
        value: 'anxious',
        label: 'Anxious',
        emoji: '😥',
        emotionTags: ['anxiety', 'panic'],
      },
      { value: 'sad', label: 'Sad', emoji: '😢', emotionTags: ['sadness'] },
      {
        value: 'stressed',
        label: 'Stressed',
        emoji: '😣',
        emotionTags: ['stress', 'overwhelm'],
      },
      {
        value: 'neutral',
        label: 'Just checking in',
        emoji: '😊',
        emotionTags: ['general'],
      },
    ],
  },
  {
    id: 1,
    question: 'What would be most helpful right now?',
    options: [
      {
        value: 'calm-down',
        label: 'Something to help me calm down',
        emoji: '🌊',
        emotionTags: ['anxiety', 'panic', 'overwhelm'],
      },
      {
        value: 'ground',
        label: 'Help me feel grounded',
        emoji: '🌱',
        emotionTags: ['overwhelm', 'racing-thoughts', 'anxiety'],
      },
      {
        value: 'distract',
        label: 'A gentle distraction',
        emoji: '✨',
        emotionTags: ['racing-thoughts', 'sadness'],
      },
      {
        value: 'breathe',
        label: 'Breathing exercises',
        emoji: '💨',
        emotionTags: ['anxiety', 'panic', 'stress'],
      },
      {
        value: 'explore',
        label: 'Just want to explore',
        emoji: '🧭',
        emotionTags: ['general'],
      },
    ],
  },
];

// ========================================
// Default Coping Strategies
// ========================================

export const DEFAULT_COPING_STRATEGIES: CopingStrategy[] = [
  {
    id: 'box-breathing',
    name: 'Box Breathing',
    description:
      'A simple breathing technique used by Navy SEALs to stay calm under pressure. Breathe in a square pattern.',
    category: 'breathing',
    emotionTags: ['anxiety', 'panic', 'stress', 'overwhelm'],
    steps: [
      'Breathe in slowly through your nose for 4 counts',
      'Hold your breath for 4 counts',
      'Breathe out slowly through your mouth for 4 counts',
      'Hold empty for 4 counts',
      'Repeat 4-5 times or until you feel calmer',
    ],
    estimatedMinutes: 3,
    difficulty: 'easy',
    isDefault: true,
  },
  {
    id: '5-4-3-2-1-grounding',
    name: '5-4-3-2-1 Grounding',
    description:
      'Use your five senses to ground yourself in the present moment and interrupt anxious thoughts.',
    category: 'grounding',
    emotionTags: ['anxiety', 'panic', 'overwhelm', 'racing-thoughts'],
    steps: [
      'Name 5 things you can see around you',
      'Name 4 things you can physically feel (texture, temperature)',
      'Name 3 things you can hear right now',
      'Name 2 things you can smell (or like to smell)',
      'Name 1 thing you can taste (or enjoy tasting)',
    ],
    estimatedMinutes: 5,
    difficulty: 'easy',
    isDefault: true,
  },
  {
    id: 'body-scan-meditation',
    name: 'Body Scan Meditation',
    description:
      'Systematically focus on different parts of your body to release tension and increase awareness.',
    category: 'meditation',
    emotionTags: ['stress', 'anxiety', 'overwhelm'],
    steps: [
      'Find a comfortable position, sitting or lying down',
      'Close your eyes and take 3 deep breaths',
      'Starting at your toes, notice any sensations without judgment',
      'Slowly move your attention up through your body',
      'If you notice tension, breathe into that area',
      'Continue until you reach the top of your head',
    ],
    estimatedMinutes: 10,
    difficulty: 'medium',
    isDefault: true,
  },
  {
    id: 'leaves-on-stream',
    name: 'Leaves on a Stream',
    description:
      'A mindfulness exercise to observe your thoughts without getting caught up in them.',
    category: 'mindfulness',
    emotionTags: ['racing-thoughts', 'anxiety', 'overwhelm', 'sadness'],
    steps: [
      'Close your eyes and imagine a gentle stream',
      'Picture leaves floating on the water',
      'When a thought comes, place it on a leaf',
      'Watch the leaf float away down the stream',
      "Don't judge the thoughts - just observe and let them go",
      'Continue for 5-10 minutes',
    ],
    estimatedMinutes: 7,
    difficulty: 'medium',
    isDefault: true,
  },
  {
    id: 'mindful-observation',
    name: 'Mindful Observation',
    description:
      'Choose an object and observe it with complete attention to bring yourself into the present.',
    category: 'mindfulness',
    emotionTags: ['racing-thoughts', 'anxiety', 'general'],
    steps: [
      'Choose an object near you (plant, cup, photo, etc.)',
      'Look at it as if seeing it for the first time',
      'Notice its colors, textures, shapes, and details',
      'If your mind wanders, gently bring focus back',
      'Spend 3-5 minutes in observation',
    ],
    estimatedMinutes: 4,
    difficulty: 'easy',
    isDefault: true,
  },
];
