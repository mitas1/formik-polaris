import React from 'react';

import {
  Checkbox as PolarisChoiceList,
  CheckboxProps as PolarisPolarisChoiceList,
} from '@shopify/polaris';

import {
  Omit,
  OmittedPolarisProps,
} from './types';
import {
  usePolarisField,
  UsePolarisFieldProps,
} from './usePolarisField';

type Props<V> = UsePolarisFieldProps<V, boolean> & PolarisPolarisChoiceList;

export type CheckboxProps<V> = Omit<Props<V>, OmittedPolarisProps>;

function CheckboxField<V = any>(props: CheckboxProps<V>) {
  const { name, encode, decode, validate, ...polarisProps } = props;

  const {
    value: rawValue,
    isSubmitting,
    handleFocus,
    handleBlur,
    handleChange,
    error,
  } = usePolarisField<V, boolean>({ name, encode, decode, validate });

  const value = rawValue === undefined ? false : rawValue;
  if (typeof value !== 'boolean') {
    throw new Error(
      `[Checkbox] Found value of type "${typeof value}" for field "${name}". Requires boolean (after decode)`,
    );
  }

  return (
    <PolarisChoiceList
      id={name}
      error={error}
      disabled={isSubmitting}
      {...polarisProps}
      checked={value}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );
}

export default CheckboxField;
