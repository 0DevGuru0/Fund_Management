import { FC, isValidElement, useEffect, useRef } from 'react';

import clsx from 'classnames';
import styled from 'styled-components';

import { Button } from '$application/components/atoms/buttons/Button';
import IconButton from '$application/components/atoms/buttons/IconButton';
import { LoadingData } from '$application/components/atoms/etc/LoadingData';
import { Modal } from '$application/components/atoms/etc/Modal';

import StepContent from './Wizard/StepContent';
import { Stepper } from './Wizard/Stepper';
import { WizardProps } from './Wizard/types';

export const Wizard: FC<WizardProps> = ({
  steps = [],
  currentStep = 0,
  nextLabel = 'Next',
  doneLabel = 'Done',
  cancelLabel = 'Cancel',
  nextDisabled = false,
  initialLoading = false,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = 0;
    }
  }, [currentStep]);

  const step = steps?.[currentStep];
  if (!step) return null;
  const lastStep = currentStep === steps.length - 1;

  return (
    <Modal open={props.open} className={clsx('Wizard', props.className)}>
      <Container>
        <Side>
          <IconWrapper>{props.icon}</IconWrapper>
          <SideContent>
            <Title>{props.title}</Title>
            <Description>{props.description}</Description>
          </SideContent>
          <Stepper currentStep={currentStep} count={steps.length} />
        </Side>
        <StepContainer>
          <LoadingData
            loading={initialLoading}
            customLoaderWrapper={(Loader) => (
              <LoaderWrapper>
                <Loader />
              </LoaderWrapper>
            )}
          >
            {() => (
              <>
                <StepContent $last={lastStep} ref={ref}>
                  {isValidElement(step.title) ? (
                    step.title
                  ) : (
                    <StepTitle $last={lastStep}>{step.title}</StepTitle>
                  )}
                  {step.children}
                </StepContent>
                {!lastStep && <Separator />}
                <StepActions>
                  <NavigationActions>
                    {step.buttons?.map((button, i) => (
                      <IconButton
                        color={button.color ?? 'Primary'}
                        variant="WithText"
                        icon={button.icon}
                        key={`ub-${i}`}
                        title={button.label}
                        onClick={button.onClick}
                      />
                    ))}
                  </NavigationActions>
                  {lastStep ? (
                    <NavigationActions>
                      <Button
                        title={doneLabel}
                        color="primary"
                        variant="contained"
                        onClick={props.onDone}
                      />
                    </NavigationActions>
                  ) : (
                    <NavigationActions>
                      <Button
                        title={cancelLabel}
                        variant="contained"
                        onClick={props.onCancel}
                      />
                      <Button
                        title={nextLabel}
                        color="primary"
                        variant="contained"
                        rightIcon="arrow-right"
                        onClick={props.onNext}
                        disabled={nextDisabled}
                        isLoading={props.nextLoading}
                      />
                    </NavigationActions>
                  )}
                </StepActions>
              </>
            )}
          </LoadingData>
        </StepContainer>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  height: 524px;
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  overflow: hidden;
  // TODO: get box shadow from theme
  box-shadow: 0 0 24px 0 rgba(193, 205, 221, 0.3);
`;

const Side = styled.div`
  box-sizing: border-box;
  width: 295px;
  background-color: ${({ theme }) => theme.background.secondary};
  padding: 48px 48px 10px 48px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-right: 1px solid ${({ theme }) => theme.border};
`;

const StepContainer = styled.div`
  width: 729px;
  background-color: ${({ theme }) => theme.background.primary};
  display: flex;
  flex-direction: column;
`;

const SideContent = styled.div`
  flex: 1;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.text.contrast.secondary};
  font-size: 20px;
  font-weight: bold;
`;

const Description = styled.div`
  color: ${({ theme }) => theme.palette.grey['800']};
  font-size: 16px;
  font-weight: 300;
  line-height: 1.88;
`;

const StepTitle = styled.div<{ $last?: boolean }>`
  color: ${({ theme, $last }) =>
    $last ? theme.text.contrast.secondary : theme.text.contrast.primary};
  font-size: 20px;
  font-weight: bold;
  line-height: 1.2;
`;

const StepActions = styled.div`
  height: 84px;
  margin: 5px 0 0;
  padding: 0 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavigationActions = styled.div`
  display: flex;
  gap: 12px;
`;

const Separator = styled.hr`
  width: 633px;
  height: 1px;
  margin: 0 48px;
  background-color: ${({ theme }) => theme.palette.primaryLight};
  border: none;
`;
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const IconWrapper = styled.div`
  margin-bottom: 88px;
  svg {
    width: 48px;
    height: 48px;
    path,
    use {
      fill: ${({ theme }) => theme.palette.grey['600']};
    }
  }
`;

export default Wizard;
