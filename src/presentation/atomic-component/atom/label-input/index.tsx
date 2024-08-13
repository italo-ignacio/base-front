/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-nested-ternary */
import { ErrorOutline, WarningOutlined } from '@mui/icons-material';
import { MaskInput } from 'presentation/atomic-component/atom/mask-input';
import { TextField } from '@mui/material';
import type { FC, FocusEventHandler, ReactNode } from 'react';
import type { InputBaseComponentProps, TextFieldProps } from '@mui/material';
import type { UseFormRegisterReturn } from 'react-hook-form';

export interface LabelInputProps
  extends Pick<
    TextFieldProps,
    | 'defaultValue'
    | 'InputProps'
    | 'inputProps'
    | 'label'
    | 'maxRows'
    | 'minRows'
    | 'multiline'
    | 'onChange'
    | 'onKeyDown'
    | 'onKeyUp'
    | 'size'
    | 'value'
  > {
  id?: string;
  register?: UseFormRegisterReturn;
  type?: string;
  variant?: 'filled' | 'outlined' | 'standard';
  uppercase?: boolean;
  required?: boolean;
  labelTop?: string;
  autoComplete?: string;
  mask?: string;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  maxWidth?: number | string;
  children?: ReactNode;
  error?: boolean;
  errorMessage?: string;
  EndIcon?: ReactNode;
  StartIcon?: ReactNode;
  onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  onFocusOut?: () => void;
}

export const LabelInput: FC<LabelInputProps> = ({
  register,
  label,
  children,
  maxWidth,
  mask,
  autoComplete,
  required,
  labelTop,
  ...props
}) => {
  const getElement = (): ReactNode => {
    if (children) return children;

    const InputProps = {
      ...props.InputProps,
      autoComplete,
      endAdornment: props.EndIcon ? (
        props.EndIcon
      ) : props.error ? (
        <ErrorOutline color={'error'} />
      ) : null,
      startAdornment: props.StartIcon ? props.StartIcon : null
    };

    const inputProps: InputBaseComponentProps = {
      ...props.inputProps,
      style: {
        padding: props.variant === 'filled' || props.variant === 'standard' ? '14px 2px' : '14px',
        textTransform: props.uppercase ? 'uppercase' : 'none'
      }
    };

    if (mask)
      return (
        <MaskInput
          {...props}
          InputProps={InputProps}
          error={props.error}
          inputProps={inputProps}
          label={label}
          mask={mask}
          onBlur={props.onFocusOut}
          onFocus={props.onFocus}
          register={register}
          sx={{
            width: '100%'
          }}
        />
      );

    return (
      <TextField
        {...register}
        {...props}
        InputProps={InputProps}
        disabled={props.disabled}
        error={props.error}
        inputProps={inputProps}
        label={label}
        onBlur={props.onFocusOut}
        onChange={props.onChange ? props.onChange : register?.onChange}
        onFocus={props.onFocus}
        placeholder={props.placeholder}
        sx={{
          width: '100%'
        }}
        type={props.type}
        value={props.value}
      />
    );
  };

  return (
    <div
      className={'flex flex-col gap-1 w-full text-start'}
      style={{
        maxWidth
      }}
    >
      {labelTop ? (
        <span className={'font-semibold'}>
          {labelTop}
          {required ? <span className={'text-[#ff4747]'}> *</span> : ''}
        </span>
      ) : null}

      <div className={'flex w-full'}>{getElement()}</div>

      {props.error && props.errorMessage ? (
        <span className={'flex gap-1 mb-1 text-red'}>
          <WarningOutlined /> {props.errorMessage}
        </span>
      ) : null}
    </div>
  );
};
