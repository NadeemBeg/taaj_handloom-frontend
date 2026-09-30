import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold' | 'whatsapp';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

const variants: Record<Variant, string> = {
  primary: 'bg-brand-deep text-ivory shadow-soft hover:bg-brand-mid active:bg-brand-deep',
  secondary: 'bg-sage text-forest-700 hover:bg-brand-soft active:bg-sage',
  outline: 'border border-brand-deep/30 text-brand-deep hover:border-brand-deep/60 hover:bg-sage/50',
  ghost: 'text-charcoal hover:bg-ivory',
  gold: 'bg-gold text-ivory shadow-soft hover:bg-gold-light active:bg-gold',
  whatsapp: 'bg-whatsapp text-white shadow-soft hover:bg-whatsapp-dark active:bg-whatsapp',
};

const sizes: Record<Size, string> = {
  sm: 'px-3.5 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', fullWidth, className, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 ease-premium',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    />
  );
});
