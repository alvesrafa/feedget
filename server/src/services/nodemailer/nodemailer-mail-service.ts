import { MailService, SendMailData } from '../mail-service';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '5bcfc557d83009',
    pass: '97e92fce3d736c',
  },
});

export class NodeMailerMailService implements MailService {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Rafael Alves <alvesrafa.dev@gmail.com>',
      subject: subject,
      html: body,
    });
  }
}
