import { FeedbacksRepository } from '../../repositories/FeedbacksRepository';
import { MailService } from '../../services/mail-service';

// Bom recriar a interface pois são camadas diferentes
interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailService: MailService
  ) {}

  async execute(body: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = body;

    if (!type) throw new Error('Type is required');

    if (!comment) throw new Error('Comment is required');

    if (screenshot && !screenshot.startsWith('data:image/png;base64'))
      throw new Error('Invalid screenshot');

    // Caso realize o código abaixo, estaria acoplando toda a funcionalidade a essa função
    // const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    // await prismaFeedbacksRepository.create({ type, comment, screenshot });

    // Ao utilizar essa referencia recebida pela contexto (no constructor),
    // poderia utilizar qualquer ORM
    // Pois em tese, todos estarão implementando o FeedbacksRepository
    // que é a Interface que define o comportamento de cada ORM
    await this.feedbacksRepository.create({ type, comment, screenshot });

    await this.mailService.sendMail({
      subject: 'Novo feedback',
      body: [
        '<div style="font-family: sans-serif; font-size:16px; color: #111;">',
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}" />` : undefined,
        '</div>',
      ].join('\n'),
    });
  }
}
