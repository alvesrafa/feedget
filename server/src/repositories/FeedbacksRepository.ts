export interface FeedBackCreateDto {
  type: string;
  comment: string;
  screenshot?: string;
}
// Interface Segregation Principle
export interface FeedbacksRepository {
  create: (data: FeedBackCreateDto) => Promise<void>;
}
