export interface FeedbackCreateData{
    type: string;
    comment: string;
    image?: string;
}

export interface FeedbackRespository{
    create: (data: FeedbackCreateData) => Promise<void>;
}