import { ChatTeardropDots } from 'phosphor-react';
import { Popover } from '@headlessui/react';
import { WidgetForm } from '../WidgetForm';

export function WidgetButton() {
  return (
    <Popover className="absolute bottom-4 right-4 md:bottom-10 md:right-10 flex flex-col items-end">
      <Popover.Panel>
        <WidgetForm />
      </Popover.Panel>

      <Popover.Button className="bg-brand-500 rounded-full px-4 h-14 text-white flex items-center group">
        <ChatTeardropDots className="w-6 h-6" />

        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear">
          <span className="pl-2"></span>
          Feedback
        </span>
      </Popover.Button>
    </Popover>
  );
}
