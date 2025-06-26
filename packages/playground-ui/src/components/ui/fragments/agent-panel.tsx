import { InfoIcon, WorkflowIcon } from 'lucide-react';
import { AgentIcon, Icon, MemoryIcon, ToolsIcon } from '@/ds/icons';
import { Badge } from '@/ds/components/Badge/Badge';
import { cn } from '@/lib/utils';
import { Txt } from '@/ds/components/Txt';

type AgentPanelProps = {
  className?: string;
  style?: React.CSSProperties;
  Link?: any;
  agent?: any; // Replace with actual agent type
  memory?: any; // Replace with actual memory type
};

export function AgentPanel({ agent, memory, className, style, Link }: AgentPanelProps) {
  const toolBadges = Object.entries(agent?.tools ?? {}).map(([toolKey, tool]) => ({
    name: toolKey,
    icon: <ToolsIcon />,
  }));

  const workflowBadges = Object.entries(agent?.workflows ?? {}).map(([workflowKey, workflow]) => ({
    name: workflowKey,
    icon: <WorkflowIcon />,
  }));

  const modelBadges = [
    {
      name: agent?.provider?.split('.')[0],
    },
    { name: agent?.modelId },
  ];

  const memoryBadges = [
    {
      name: memory?.result ? 'Memory is On' : 'Memory is Off',
      icon: <MemoryIcon />,
    },
  ];

  const formattedInstructions = agent?.instructions
    .split('\n')
    .map(line => line.trim())
    .join('\n');

  return (
    <div className="grid grid-rows-[auto_1fr]  p-[22px]">
      <div className={cn('flex gap-2 text-[16px] items-center mb-[30px]', '[&>svg]:w-[20px] [&>svg]:h-[20px]')}>
        <AgentIcon />
        {agent?.name}
      </div>
      <div className="grid gap-[30px] content-start">
        <PanelSection title="Memory" href="https://mastra.ai/en/docs/agents/agent-memory">
          <PanelBadges badges={memoryBadges} />
        </PanelSection>
        <PanelSection title="Model">
          <PanelBadges badges={modelBadges} />
        </PanelSection>
        <PanelSection title="Tools" href="https://mastra.ai/en/docs/agents/using-tools-and-mcp">
          <PanelBadges badges={toolBadges} />
        </PanelSection>
        <PanelSection title="Workflows" href="https://mastra.ai/en/docs/workflows/overview">
          <PanelBadges badges={workflowBadges} />
        </PanelSection>
        <PanelSection title="System prompt">
          <Txt
            as="p"
            variant="ui-md"
            className="bg-surface4 text-icon6 whitespace-pre-wrap rounded-lg px-2 py-1.5 text-sm"
          >
            {formattedInstructions}
          </Txt>
        </PanelSection>
      </div>
    </div>
  );
}

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

type PanelBadgesProps = {
  badges?: { name: string; icon?: React.ReactNode }[];
  className?: string;
  style?: React.CSSProperties;
};

export function PanelBadges({ badges }: PanelBadgesProps) {
  return (
    <div className="flex flex-wrap gap-2 text-[12px] text-icon3">
      {badges && badges.length > 0
        ? badges?.map(badge => (
            <Badge key={badge.name} icon={badge.icon}>
              {badge.name}
            </Badge>
          ))
        : 'Not defined'}
    </div>
  );
}
