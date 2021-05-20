import React from 'react';
import styled from 'styled-components';

import { getColor } from '../../../../utils/helpers';
import { Spinner } from '../../../Spinner';

const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  opacity: 0.75;
  background-color: ${getColor('graphiteH')};
`;

const LoadingContent = styled.div`
  display: inline-block;
  position: sticky;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: 4rem;
`;

const LoadingOverlay: React.FC = () => (
  <LoadingContainer>
    <LoadingContent>
      <Spinner height={48} width={48} />
    </LoadingContent>
  </LoadingContainer>
);

export default LoadingOverlay;
