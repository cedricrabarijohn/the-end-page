export interface PageData {
  id?: number | string;
  userId?: number | string;
  title: string;
  url?: string;
  message: string;
  content?: string;
  tone: string;
  theme: string;
  status: 'draft' | 'published' | 'archived';
  confidentiality?: 'public' | 'private';
  media: {
    image: string | null;
    video: string | null;
    audio: string | null;
  };
  views?: number;
  createdAt?: string;
  updatedAt?: string;
}
