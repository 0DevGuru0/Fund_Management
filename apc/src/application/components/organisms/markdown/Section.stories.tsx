import React from 'react';

import Typography from '$application/components/atoms/markdown/Typography';
import CollapseCard from '$application/components/molecules/markdown/CollapseCard';
import { StoryFC } from '$application/components/StoryFC';

import Section, { SectionProps } from './Section';

export default {
  title: 'Organisms / Markdown',
  component: Section,
  parameters: {
    zeplinLink:
      'https://app.zeplin.io/project/60865602084a7012b372e417/screen/6180fe088b96f0bdb58fe811',
  },
};

export const MultiSection: StoryFC<SectionProps> = (args) => {
  return (
    <Section {...args}>
      <CollapseCard title="Collapsible Card1">
        <Typography>
          Tax is calculated by Stripe Tax if you enable it by passing the
          automatic_tax[enabled] parameter when you create each Checkout Session,
          Subscription, or Invoice. An “active tax registration” is one that:
        </Typography>
      </CollapseCard>
      <CollapseCard title="Collapsible Card2">
        <Typography>
          We charge a fee when you complete a transaction with tax calculated by Stripe
          Tax. You’re only charged for using Stripe Tax on transactions to customers in
          states or countries where you’re registered to collect tax. If the registration
          options you have selected are either VAT OSS - European Union or Small Seller -
          European Union, you’re charged on all EU transactions.
        </Typography>
      </CollapseCard>
    </Section>
  );
};

MultiSection.args = {
  open: true,
  title: 'Marketplaces',
};
