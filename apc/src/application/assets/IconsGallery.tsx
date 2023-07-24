import React, { FC } from 'react';

import styled from 'styled-components';

const iconSize = 80;

// TODO: turn this into an opensource addon
export const IconsGallery: FC = (props) => {
  const req = require.context('../', true, /\.\/(.*)\.svg$/);
  const componentsDir = 'src/components';

  const icons = req.keys().map((key) => ({
    filePath: key.match(/\.\/(.*)/)![1],
    module: req(key).default,
  }));

  return (
    <Container>
      {icons.map((ic, index) => {
        const IconComponent = ic.module;
        const link = `vscode://file${process.env.PROJECT_ROOT_PATH}/${componentsDir}/${ic.filePath}`;

        return (
          <IconContainer href={link} title={ic.filePath} key={ic.filePath}>
            <Icon>
              <IconComponent width={iconSize} height={iconSize} />
            </Icon>
          </IconContainer>
        );
      })}
    </Container>
  );
};

const IconContainer = styled.a`
  cursor: pointer;
`;

const Icon = styled.div`
  display: flex;
  height: ${iconSize}px;
  width: ${iconSize}px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, ${iconSize + 20}px);
  grid-template-rows: repeat(5, ${iconSize + 50}px);
  align-items: center;
  justify-items: center;
`;

export default IconsGallery;
