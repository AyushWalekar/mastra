import { InfoIcon } from '@/ds/icons';

type PanelSectionProps = {
  title?: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
};

export function PanelSection({ children, title, href }: PanelSectionProps) {
  return (
    <div className="grid gap-[10px]">
      <div className="flex items-center gap-2">
        <h3 className="text-[12px] text-icon3">{title}</h3>
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="[&>svg]:text-icon3 [&>svg]:w-[12px] [&>svg]:h-[12px]"
          >
            <InfoIcon />
          </a>
        )}
      </div>
      {children}
    </div>
  );
}
