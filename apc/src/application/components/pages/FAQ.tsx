import React from 'react';

import { NextPage } from 'next';
import styled from 'styled-components';

import Separator from '$application/components/atoms/markdown/Separator';
import Typography from '$application/components/atoms/markdown/Typography';
import CollapseCard from '$application/components/molecules/markdown/CollapseCard';
import Section from '$application/components/organisms/markdown/Section';

import { sampleMarkdown } from './FAQ/sampleMarkdown';

const FAQ: NextPage = () => {
  return (
    <Container>
      <Typography>{sampleMarkdown}</Typography>
      <Typography>
        In this page you can find answers to frequently asked questions asked by many
        users. We tried to answer them as best as possible, but if you still have a
        question, please feel free to contact us.
      </Typography>
      <Separator />
      <Section title="General" open={true}>
        <CollapseCard title="How to implement complex workflows?">
          <Typography>
            There is a difference between a business process and a workflow. You may have
            a 10-step process, but this process may be implemented by a workflow with only
            three different roles.
          </Typography>
        </CollapseCard>
        <CollapseCard title="Can I pause my workflow?">
          <Typography>
            While there is not a general pause button for your workflow, you can set up
            pause dates so that actions do not execute on specific days. On pause dates,
            actions will reschedule to the next available day. This is especially useful
            for managing campaigns that overlap with holidays and other sensitive dates.
          </Typography>
        </CollapseCard>
      </Section>
      <Separator />
      <Section title="Enrollment Triggers">
        <CollapseCard title="Why are my workflow actions not executing at the expected time?">
          <Typography>
            When a large number of records enroll in a workflow or execute an action at
            the same time, the workflow may be throttled. When a workflow is throttled,
            actions will not execute immediately, but in a queue as records are processed.
          </Typography>
        </CollapseCard>
      </Section>
    </Container>
  );
};

export default FAQ;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
