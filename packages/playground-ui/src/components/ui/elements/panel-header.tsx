import { cn } from '@/lib/utils';

type PanelHeaderProps = {
  title: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export function PanelHeader({ children, title, icon, className, style }: PanelHeaderProps) {
  return (
    <div
      className={cn('flex gap-2 text-[16px] items-center mb-[30px]', '[&>svg]:w-[20px] [&>svg]:h-[20px]', className)}
      style={style}
    >
      {icon && icon}
      {title}
      {children}
    </div>
  );
}
