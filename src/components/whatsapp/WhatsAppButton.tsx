import { buildWhatsappUrl, type WhatsappOrderPayload } from '@taaj/shared';
import { useSite } from '../../hooks/useSite';
import { useCustomer, selectCustomerType } from '../../store/customer';
import { cn } from '../../lib/cn';

interface WhatsAppButtonProps {
  payload: WhatsappOrderPayload;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3 text-base',
};

/** Renders an "Order on WhatsApp" link with a pre-filled, encoded message. */
export function WhatsAppButton({
  payload,
  label = 'Order on WhatsApp',
  size = 'md',
  fullWidth,
  className,
}: WhatsAppButtonProps) {
  const { whatsappNumber } = useSite();
  const customerType = useCustomer(selectCustomerType);
  // The active shopping mode rides along on every WhatsApp CTA unless the
  // caller has already set one explicitly.
  const href = buildWhatsappUrl(whatsappNumber, { customerType, ...payload });
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] font-medium text-white transition-colors hover:bg-[#1FB457]',
        sizes[size],
        fullWidth && 'w-full',
        className,
      )}
    >
      <WhatsAppIcon className="h-4 w-4" />
      {label}
    </a>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.29-.14-1.7-.84-1.96-.94-.26-.1-.45-.14-.64.14-.19.29-.74.94-.9 1.13-.17.19-.33.21-.62.07-.29-.14-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.61-2-.17-.29-.02-.44.13-.58.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.55-.88-2.12-.23-.55-.46-.48-.64-.49l-.55-.01c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38 0 1.4 1.02 2.76 1.17 2.95.14.19 2.02 3.08 4.89 4.32.68.29 1.21.47 1.63.6.68.22 1.31.19 1.8.12.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.33zM12.02 2C6.5 2 2.02 6.48 2.02 12c0 1.77.46 3.42 1.28 4.86L2 22l5.29-1.38A9.94 9.94 0 0 0 12.02 22C17.54 22 22 17.52 22 12S17.54 2 12.02 2z" />
    </svg>
  );
}
