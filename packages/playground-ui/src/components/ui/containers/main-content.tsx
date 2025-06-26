import { cn } from '@/lib/utils';

export function MainContent({
  children,
  className,
  //  isCentered = false,
  //  isDivided = false,
  //  hasLeftServiceColumn = false,
  style,
  //  width = 'narrow',
  variant = 'default',
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'default' | 'forAgent' | 'forAgentWithHistory';
}) {
  return (
    <div
      className={cn(
        {
          'grid overflow-y-auto h-full overflow-x-auto min-w-[min-content]': variant !== 'default',
          'grid grid-cols-[1fr_1fr]': variant === 'forAgent',
          '[&>:nth-child(1)]:bg-black [&>:nth-child(1)]:py-6': variant === 'forAgent',
          'grid grid-cols-[auto_1fr_1fr]': variant === 'forAgentWithHistory',
          '[&>:nth-child(2)]:bg-black [&>:nth-child(2)]:py-6': variant === 'forAgentWithHistory',
        },
        className,
      )}
      style={{
        ...style,
        // border: '2px solid red',
      }}
    >
      {children}
    </div>
  );
}
