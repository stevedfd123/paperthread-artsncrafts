export interface Reminder {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string;
  category: 'custom-order' | 'anniversary' | 'event' | 'workshop' | 'other';
  notes?: string;
  notified?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export type ThemeType = 'mystic-orchid' | 'cherry-blossom' | 'royal-violet' | 'pastel-pink-purple' | 'pastel-mint-gold' | 'pastel-peach-rose';

export interface ThemeColors {
  bgOuter: string;
  bgCard: string;
  bgInput: string;
  textPrimary: string;
  textSecondary: string;
  primaryAccent: string; // Pink / Magenta
  secAccent: string; // Purple / Indigo
  border: string;
  glowColor: string;
}

/** A gallery grouping, mirroring a subfolder of the Google Drive "Products" folder. */
export interface ProductCollection {
  slug: string;
  label: string;
  count: number;
}

export interface Artwork {
  id: string;
  title: string;
  /** Collection slug, e.g. 'mandalas'. Matches a ProductCollection.slug. */
  category: string;
  /** Human-readable collection name, e.g. 'Mandalas'. */
  collection: string;
  description: string;
  image: string;
  /** Google Drive file ID backing `image`. */
  driveId?: string;
  size: string;
  priceEstimate?: string;
}

export interface Craftwork {
  id: string;
  title: string;
  /** Collection slug, e.g. 'greeting-cards'. Matches a ProductCollection.slug. */
  category: string;
  /** Human-readable collection name, e.g. 'Greeting Cards'. */
  collection: string;
  description: string;
  image: string;
  /** Google Drive file ID backing `image`. */
  driveId?: string;
  timeToMake: string;
  priceEstimate?: string;
}

export interface MemoryLaneEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  tag: string;
}

export interface Ticket {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  specialtyType: 'fine-line' | 'circular-fusion' | 'popup-card' | 'shadowbox' | 'custom';
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-design' | 'crafting' | 'threading' | 'ready';
  createdAt: string;
  estimatedDays: number;
}
