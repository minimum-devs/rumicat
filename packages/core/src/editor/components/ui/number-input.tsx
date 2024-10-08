import { cn } from '@/editor/utils/classname';
import { type LucideIcon, ScanIcon } from 'lucide-react';

type NumberInputProps = {
  value: number;
  onValueChange: (value: number) => void;
  icon?: LucideIcon;
};

export function NumberInput(props: NumberInputProps) {
  const { value, onValueChange, icon: Icon } = props;

  return (
    <label className="mly-relative mly-flex mly-items-center mly-justify-center">
      {Icon ? <Icon size={14} className="mly-absolute mly-left-1.5" /> : null}
      <input
        type="number"
        value={value}
        onChange={(e) => onValueChange(Number(e.target.value))}
        className={cn(
          'hide-number-controls focus-visible:outline-none mly-h-auto mly-max-w-12 mly-border-0 mly-border-none mly-p-1 mly-text-sm mly-tabular-nums mly-outline-none',
          Icon ? 'mly-pl-[26px]' : ''
        )}
        min={0}
      />
    </label>
  );
}
