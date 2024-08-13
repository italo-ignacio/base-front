import { TextField } from '@mui/material';
import { useEffect } from 'react';
import { useIMask } from 'react-imask';
import type { ChangeEvent, FC } from 'react';
import type { TextFieldProps } from '@mui/material';
import type { UseFormRegisterReturn } from 'react-hook-form';

type MaskInputProps = TextFieldProps & {
  mask: string;
  register?: UseFormRegisterReturn;
};

export const MaskInput: FC<MaskInputProps> = ({ mask, register, value, ...props }) => {
  const maskRef = useIMask({
    mask
  });

  useEffect(() => {
    maskRef.setValue(value ? String(value) : '');
  }, [value]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (props.onChange) props.onChange(event);
    else if (register?.onChange) register.onChange(event);
  };

  return (
    <TextField
      {...props}
      {...register}
      inputRef={maskRef.ref}
      onInput={handleInputChange}
      ref={register?.ref}
      type={'tel'}
    />
  );
};
