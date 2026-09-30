import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

type Tone = 'green' | 'gold' | 'success' | 'warning' | 'error' | 'neutral';

const tones: Record<Tone, string> = {
  green: 'bg-brand-deep text-ivory',
  gold: 'bg-gold text-ivory',
  success: 'bg-success-soft text-success',
  warning: 'bg-warning-soft text-warning',
  error: 'bg-error-soft text-error',
  neutral: 'bg-sage text-forest-700',
};

export function Badge({
  children,
  tone = 'green',
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return <span className={cn('badge', tones[tone], className)}>{children}</span>;
}
