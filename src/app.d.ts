export interface IComponentWithChildren {
    children: React.ReactNode;
};

export interface IUserDetails {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    avatar: string;
};

export enum tone {
    DRAMATIC = 'Dramatic',
    IRONIC = 'Ironic',
    FUNNY = 'Funny',
    SERIOUS = 'Serious',
    SAD = 'Sad',
    HAPPY = 'Happy',
    NEUTRAL = 'Neutral'
};
export interface IPageData {
  id?: number | string;
  userId?: number | string;
  title: string;
  url?: string;
  message: string;
  content?: string;
  tags: tone;
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
