import { useTheme } from 'styled-components';
import { useDeepCompareMemo } from 'use-deep-compare';
import { has, sortBy } from 'ramda';
import { useState } from 'react';

import {
  ClearIndicator,
  DropdownIndicator,
  IndicatorsContainer,
  Menu,
  MultiValueContainer,
  MultiValueLabel,
  MultiValueRemove,
  Option,
  ValueContainer,
  reactSelectTheme,
  selectStyles,
} from './Select.styles';
import { SelectProps } from './Select.types';

export const useSelectProps = <IsMulti extends boolean>({
  options = [],
  placeholder = '',
  isInvalid = false,
  isDisabled = false,
  isClearable = false,
  maxPillLabelLength = 16,
  maxVisibleItem,
  defaultIsMenuOpen,
  menuActions,
  isMenuPositionRelative = false,
  isMulti,
  isLoading = false,
  noOptionsMessage = ({ inputValue }) => `No match found for "${inputValue}"`,
  ...props
}: SelectProps<IsMulti>): Record<string, unknown> => {
  const DSTheme = useTheme();
  const sortedOptions = useDeepCompareMemo(
    () => sortBy(has('options'), options),
    [options],
  );

  const [showAllItems, setShowAllItems] = useState(false);

  const handleOnClickShowAllItems = () => setShowAllItems(true);

  return {
    maxMenuHeight: 270,
    ...props,
    closeMenuOnSelect: !isMulti,
    components: {
      DropdownIndicator,
      ClearIndicator,
      IndicatorsContainer,
      ValueContainer: ValueContainer(
        maxVisibleItem,
        showAllItems,
        handleOnClickShowAllItems,
      ),
      MultiValueContainer,
      MultiValueLabel: MultiValueLabel(maxPillLabelLength),
      MultiValueRemove,
      Menu,
      Option,
    },
    hideSelectedOptions: !isMulti,
    isClearable,
    isDisabled,
    isInvalid,
    isProcessing: isLoading,
    isLoading: false,
    isMenuPositionRelative,
    isMulti,
    menuActions,
    defaultMenuIsOpen: defaultIsMenuOpen,
    noOptionsMessage,
    options: sortedOptions,
    placeholder,
    styles: selectStyles(DSTheme),
    theme: reactSelectTheme(DSTheme),
    classNamePrefix: 'ssc',
  };
};
