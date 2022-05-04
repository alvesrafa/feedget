import { CloseWidgetButton } from '../../CloseButton';
import successIcon from '../../../assets/icons/success.svg';
interface FeedbackSuccessStepProps {
  onFeedbackTypeReset: () => void;
}
export function FeedbackSuccessStep({
  onFeedbackTypeReset,
}: FeedbackSuccessStepProps) {
  return (
    <>
      <header>
        <CloseWidgetButton />
      </header>
      <div className="flex flex-col items-center py-10 w-[304]">
        <img src={successIcon} alt="Ícone verde de sucesso!" />
        <span className="text-xl mt-2">Agradecemos o feedback!</span>

        <button
          onClick={onFeedbackTypeReset}
          className="py-2 px-6 mt-6 bg-zinc-800 rounded-md border-transparent text-sm leading-6 hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
        >
          Quero enviar outro
        </button>
      </div>
    </>
  );
}
