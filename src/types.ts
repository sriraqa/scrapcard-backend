export interface SCUser {
    _id: string;
    name: string;
    avatarId: string;
}

export interface ScrapCard {
    _id: string;
    userId: string;
    title?: string;
    createdAt: Date;
    lastUpdated: Date;
    thumbnail?: string;
    orientation: 'landscape' | 'portrait';
    theme: string;
    stickers?: Record<string, number[]>;
}