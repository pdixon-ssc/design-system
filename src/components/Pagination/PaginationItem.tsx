import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import {
  getColor,
  getFontSize,
  getFontWeight,
  getLineHeight,
  getRadii,
  pxToRem,
} from '../../utils';
import { Padbox } from '../layout';
import { PaginationItemProps } from './Pagination.types';

const StyledPaginationComponent = styled.button<{
  $isShrinked: boolean;
  $isCurrent: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: ${pxToRem(40)};
  height: ${pxToRem(32)};
  padding: ${pxToRem(5, 6)};
  margin: ${pxToRem(0, 4)};
  background: none;
  border: 1px solid transparent;
  border-radius: ${getRadii('default')};
  font-size: ${getFontSize('md')};
  line-height: ${getLineHeight('lg')};
  color: ${getColor('neutral.900')};
  cursor: pointer;

  &:first-of-type {
    margin-left: 0;
  }
  &:last-of-type {
    margin-right: 0;
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    color: ${getColor('neutral.600')};
    cursor: default;
  }

  ${({ $isShrinked }) =>
    $isShrinked &&
    css`
      min-width: ${pxToRem(32)};
    `};

  ${({ $isCurrent }) =>
    $isCurrent
      ? css`
          border-color: ${getColor('neutral.500')};
          background-color: ${getColor('neutral.300')};
          font-size: ${getFontSize('lg')};
          font-weight: ${getFontWeight('bold')};
          cursor: default;
        `
      : css`
          &:hover {
            border-color: ${getColor('neutral.500')};
            background-color: ${getColor('neutral.0')};
          }
        `};
`;

export const PaginationItem: React.FC<PaginationItemProps> = ({
  children,
  isDisabled,
  isCurrent,
  isShrinked,
  onClick,
  ...props
}) => {
  const handleOnClick = () => {
    if (isCurrent) {
      return;
    }

    onClick();
  };
  return (
    <StyledPaginationComponent
      $isCurrent={isCurrent}
      $isShrinked={isShrinked}
      data-testid="pagination-item"
      disabled={isDisabled}
      type="button"
      onClick={handleOnClick}
      {...props}
    >
      {children}
    </StyledPaginationComponent>
  );
};

PaginationItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  isCurrent: PropTypes.bool,
  isShrinked: PropTypes.bool,
};

export const PaginationItemElipsis = styled(Padbox).attrs(() => ({
  children: '...',
}))`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${pxToRem(40)};
  height: ${pxToRem(32)};
  font-size: ${getFontSize('md')};
  line-height: ${getLineHeight('lg')};
  color: ${getColor('neutral.600')};
  margin: ${pxToRem(0, 4)};
`;
