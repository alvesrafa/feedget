import { Router } from 'express';
import nodemailer from 'nodemailer';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { NodeMailerMailService } from './services/nodemailer/nodemailer-mail-service';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback';

export const routes = Router();

routes.post('/feedbacks', async (request, response) => {
  const { body } = request;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodeMailerService = new NodeMailerMailService();

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodeMailerService
  );

  await submitFeedbackUseCase.execute(body);

  return response.status(201).send();
});

routes.get('/healthcheck', async (request, response) => {
  return response.status(200).send();
});
