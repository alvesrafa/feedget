import { SubmitFeedbackUseCase } from '.';

const createFeedBackSpy = jest.fn();
const sendEmailSpy = jest.fn();

describe('Submit feedback use case', () => {
  const validType = 'IDEA';
  const typeNull = '';
  const validComment = 'a valid comment';
  const commentNull = '';
  const invalidScreenshot = 'png-invalid';
  const validScreenshot = 'data:image/png;base64,umaimagemválida';

  const fakeFeedbacksRepository = {
    create: createFeedBackSpy,
  };
  const fakeMailService = {
    sendMail: sendEmailSpy,
  };

  const submitFeedback = new SubmitFeedbackUseCase(
    fakeFeedbacksRepository,
    fakeMailService
  );

  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedback.execute({
        type: validType,
        comment: validComment,
        screenshot: validScreenshot,
      })
    ).resolves.not.toThrow();

    expect(createFeedBackSpy).toHaveBeenCalled();
    expect(sendEmailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback without a type', async () => {
    await expect(
      submitFeedback.execute({
        type: typeNull,
        comment: validComment,
        screenshot: validScreenshot,
      })
    ).rejects.toThrow();
  });

  it('should not be able to submit a feedback without a comment', async () => {
    await expect(
      submitFeedback.execute({
        type: validType,
        comment: commentNull,
        screenshot: validScreenshot,
      })
    ).rejects.toThrow();
  });

  it('should not be able to submit a feedback with an invalid screenshot', async () => {
    await expect(
      submitFeedback.execute({
        type: validType,
        comment: validComment,
        screenshot: invalidScreenshot,
      })
    ).rejects.toThrow();
  });
});
