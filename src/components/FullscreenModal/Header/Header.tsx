import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getColor, pxToRem } from '../../../utils';
import { Col, Container, Inline, Row } from '../../layout';
import { H2, H3 } from '../../typographyLegacy';
import { useStickyHeader } from '../hooks/useStickyHeader';
import { HeaderProps } from './Header.types';
import { CloseButton } from '../../CloseButton';

const BaseStickyHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${getColor('neutral.0')};
  border-bottom: 1px solid ${getColor('neutral.500')};
  z-index: 1;
`;

const BaseHeader = styled.header`
  padding: ${pxToRem(56, 0, 24)};
`;

const Header: React.FC<HeaderProps> = ({
  children,
  width,
  offset,
  modalRef,
  handleClose,
}) => {
  const modalHeaderRef = useRef(null);
  const { isFixed } = useStickyHeader(modalRef, modalHeaderRef);

  return (
    <>
      {isFixed && (
        <BaseStickyHeader as="div">
          <Container>
            <Row>
              <Col cols={width} offset={offset}>
                <Inline align="center" justify="space-between">
                  <H3
                    as="h2"
                    margin="none"
                    padding={{ vertical: 0.75, right: 0.75 }}
                  >
                    {children}
                  </H3>

                  <CloseButton
                    ariaLabel="Close modal window"
                    onClose={handleClose}
                  />
                </Inline>
              </Col>
            </Row>
          </Container>
        </BaseStickyHeader>
      )}
      <BaseHeader ref={modalHeaderRef}>
        <H2 margin="none">{children}</H2>
      </BaseHeader>
    </>
  );
};

Header.propTypes = {
  width: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  modalRef: PropTypes.exact({
    current:
      typeof Element === 'undefined'
        ? PropTypes.any
        : PropTypes.instanceOf(HTMLElement),
  }).isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Header;
