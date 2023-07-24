import React from 'react';
import MockDate from 'mockdate';
import { Background } from './Background';
import { QueryClientProvider } from 'react-query';
import { getReactQueryClient } from '$application/lib/getReactQueryClient';
import UrqlProvider from '$application/components/UrqlProvider';
import { ThemeProvider } from '$application/theme/ThemeProvider';
import isChromatic from 'chromatic/isChromatic';
const isChromaticEnv = isChromatic();

export const StoryComponentDecorator = (Story, context) => {
  const { mockedDate = false } = context.parameters;
  if (mockedDate || isChromaticEnv) {
    MockDate.set('2020-01-01');
  }

  return (
    <ThemeProvider isStoryBook>
      <QueryClientProvider client={getReactQueryClient()}>
        <UrqlProvider>
          <Background noPadding={context.parameters.background?.noPadding}>
            <Story />
          </Background>
        </UrqlProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
