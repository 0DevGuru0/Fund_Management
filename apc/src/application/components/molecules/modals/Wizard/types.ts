import { ColorVariant } from '$application/components/atoms/buttons/IconButton/iconButtonTypes';

interface IButton {
  label: string;
  color?: ColorVariant;
  onClick?: () => void;
  icon?: JSX.Element;
}
export interface ISteps {
  title: string | JSX.Element;
  children: JSX.Element;
  buttons?: IButton[];
}

export interface WizardProps {
  title: string;
  description: string;
  nextLabel?: string;
  doneLabel?: string;
  cancelLabel?: string;
  icon: JSX.Element;
  currentStep?: number;
  onNext?: () => void;
  onDone?: () => void;
  onCancel?: () => void;
  nextDisabled?: boolean;
  nextLoading?: boolean;
  open?: boolean;
  className?: string;
  steps: ISteps[];
  initialLoading?: boolean;
}
