import { NetworkIcon } from 'lucide-react';
import { useContext } from 'react';

import { PanelSection, PanelLayout, PanelHeader, PanelContent, PanelKeyValueList, PanelBadges } from '../elements';

import { Txt } from '@/ds/components/Txt';
import { ScrollArea } from '../scroll-area';
import { AgentIcon } from '@/ds/icons';
import { NetworkContext } from '@/domains/networks';

type AgentPanelProps = {
  className?: string;
  style?: React.CSSProperties;
  Link?: any;
  network?: any; // Replace with actual agent type
};

export function NetworkPanel({ network, className, style, Link }: AgentPanelProps) {
  const { modelSettings, setModelSettings } = useContext(NetworkContext);
  console.log({ network, modelSettings });

  const agentBadges = (network.agents || []).map(agent => ({
    name: agent.name,
    icon: <AgentIcon />,
  }));

  const formattedInstructions = network?.instructions
    .split('\n')
    .map(line => line.trim())
    .join('\n');

  return (
    <PanelLayout>
      <PanelHeader icon={<NetworkIcon />} title={network?.name} />
      <PanelContent>
        <PanelSection title="Agents">
          <PanelBadges badges={agentBadges} />
        </PanelSection>
        <PanelSection title="System prompt">
          <ScrollArea maxHeight="20rem">
            <Txt
              as="p"
              variant="ui-md"
              className="bg-surface4 text-icon6 whitespace-pre-wrap rounded-lg px-2 py-1.5 text-sm"
            >
              {formattedInstructions || 'Not defined'}
            </Txt>
          </ScrollArea>
        </PanelSection>
        <PanelSection title="Settings">
          <PanelKeyValueList
            items={[
              { key: 'Routing model', value: `${network?.routingModel?.provider}/${network?.routingModel?.modelId}` },
              { key: 'TopP', value: modelSettings?.topP?.toString() || '' },
              { key: 'Max steps', value: modelSettings?.maxSteps?.toString() || '' },
              { key: 'Max tokens', value: modelSettings?.maxTokens?.toString() || '' },
              { key: 'Temperature', value: modelSettings?.temperature?.toString() || '' },
            ]}
          />
        </PanelSection>
        <PanelSection title="Endpoints">
          <PanelKeyValueList
            items={[
              { key: 'GET', value: '/api/networks' },
              { key: 'GET', value: `/api/networks/${network.id}` },
              { key: 'POST', value: `/api/networks/${network.id}/generate` },
              { key: 'POST', value: `/api/networks/${network.id}/stream` },
            ]}
          />
        </PanelSection>
      </PanelContent>
    </PanelLayout>
  );
}
