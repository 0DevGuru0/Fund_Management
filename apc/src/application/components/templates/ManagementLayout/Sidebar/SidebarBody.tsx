import React, { FC } from 'react';

import clsx from 'classnames';
import styled from 'styled-components';

import Button from './SidebarBody/Button';
import { ServiceConfig } from './SidebarHeader/Dialog';

interface Props {
  isOpen: boolean;
  sections: Record<string, ServiceConfig[]>;
  currentPage: string;
  notifications?: number;
  className?: string;
}

export const SidebarBody: FC<Props> = ({
  sections,
  isOpen,
  currentPage,
  notifications,
  className,
}) => {
  let sidebarElements: JSX.Element[] = [];

  for (const [group, buttons] of Object.entries(sections)) {
    const ButtonElements = buttons.map((page) => (
      <Button
        key={page.label}
        isPrimary
        isActive={page.href === currentPage}
        withLabel={isOpen}
        notifications={notifications}
        {...page}
      />
    ));

    const separatorElement = (
      <SeparatorContainer key={`${group}-separator`} isOpen={isOpen}>
        {isOpen ? <SeparatorText>{group}</SeparatorText> : <Separator />}
      </SeparatorContainer>
    );

    sidebarElements = sidebarElements.concat(
      group !== 'Main' ? [separatorElement, ...ButtonElements] : ButtonElements,
    );
  }

  return <div className={clsx('sidebarBody', className)}>{sidebarElements}</div>;
};

interface ContainerProps {
  isOpen: boolean;
}

const SeparatorContainer = styled.div<ContainerProps>`
  padding: ${({ isOpen }) => (isOpen ? '12px' : '14px 36px 15px 12px')};
`;

const SeparatorText = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  color: ${({ theme }) => theme.text.lowContrast};
`;

const Separator = styled.hr`
  border: 1px solid #e3ebf7;
`;

export default SidebarBody;
