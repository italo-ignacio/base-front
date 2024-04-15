import { api } from 'infra/http';
import { apiPaths } from 'main/config';
import { resolverError } from 'main/utils';
import { sendEmailSchema } from 'validation/schema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type {
  FieldErrors,
  SubmitHandler,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue
} from 'react-hook-form';
import type { SendEmailRequest } from 'validation/schema';

interface useSendEmailProps {
  openModal: () => void;
}

export const useSendEmail = ({
  openModal
}: useSendEmailProps): {
  errors: FieldErrors<SendEmailRequest>;
  register: UseFormRegister<SendEmailRequest>;
  onSubmit: SubmitHandler<SendEmailRequest>;
  handleSubmit: UseFormHandleSubmit<SendEmailRequest>;
  getValues: UseFormGetValues<SendEmailRequest>;
  setValue: UseFormSetValue<SendEmailRequest>;
  isSubmitting: boolean;
} => {
  const {
    handleSubmit,
    register,
    setValue,
    getValues,

    formState: { errors, isSubmitting }
  } = useForm<SendEmailRequest>({
    resolver: yupResolver(sendEmailSchema)
  });

  const onSubmit: SubmitHandler<SendEmailRequest> = async (data) => {
    try {
      await api.post({
        body: data,
        route: apiPaths.sendEmail
      });

      openModal();
    } catch (error) {
      resolverError(error);
    }
  };

  return {
    errors,
    getValues,
    handleSubmit,
    isSubmitting,
    onSubmit,
    register,
    setValue
  };
};
