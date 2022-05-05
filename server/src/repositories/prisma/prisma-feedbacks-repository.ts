import { prisma } from '../../prisma';
import { FeedBackCreateDto, FeedbacksRepository } from '../FeedbacksRepository';

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create({ comment, type, screenshot }: FeedBackCreateDto) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    });
  }
}
