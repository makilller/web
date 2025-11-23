export enum MoodType {
  HAPPY = 'Happy',
  SAD = 'Sad',
  TIRED = 'Tired',
  STRESSED = 'Stressed',
  ROMANTIC = 'Romantic',
  ANGRY = 'Angry'
}

export enum ContentCategory {
  LOVE_NOTE = 'LOVE_NOTE',
  DATE_IDEA = 'DATE_IDEA',
  JOKE = 'JOKE',
  POEM = 'POEM'
}

export interface GeneratedContent {
  text: string;
  category: ContentCategory;
  emoji: string;
}

export interface MoodConfig {
  type: MoodType;
  label: string;
  icon: string; // Emoji
  color: string; // Tailwind class for background/border
  promptContext: string;
}
