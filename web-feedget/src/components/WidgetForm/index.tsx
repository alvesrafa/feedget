import { CloseWidgetButton } from '../CloseButton';

import bugIcon from '../../assets/icons/bug.svg';
import ideaIcon from '../../assets/icons/idea.svg';
import thoughtIcon from '../../assets/icons/thought.svg';
import { useState } from 'react';
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep';
import { FeedbackContentStep } from './Steps/FeedbackContentStep';
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep';

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugIcon,
      alt: 'Imagem de um inseto (bug)',
    },
  },
  IDEA: {
    title: 'Ideia',
    image: {
      source: ideaIcon,
      alt: 'Imagem de uma lâmpada',
    },
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: thoughtIcon,
      alt: 'Imagem de um balão de pensamento',
    },
  },
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleSelectType = (type: FeedbackType | null) => {
    setFeedbackType(type);
  };

  const onFeedbackTypeReset = () => {
    setFeedbackSent(false);
    setFeedbackType(null);
  };

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {feedbackSent ? (
        <FeedbackSuccessStep onFeedbackTypeReset={onFeedbackTypeReset} />
      ) : !feedbackType ? (
        <FeedbackTypeStep handleSelectType={handleSelectType} />
      ) : (
        <FeedbackContentStep
          type={feedbackType}
          onFeedbackTypeReset={onFeedbackTypeReset}
          onFeedbackSent={() => setFeedbackSent(true)}
        />
      )}

      <footer className="text-xs text-neutral-400">
        Feito com ♥ pela{' '}
        <a
          className="underline underline-offset-2"
          href="https://github.com/alvesrafa"
        >
          Rocketseat
        </a>
      </footer>
    </div>
  );
}
