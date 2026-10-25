import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface FormState {
  data: FormData;
  errors: FormErrors;
  isSubmitting: boolean;
  isSubmitted: boolean;
}

export const useContactForm = () => {
  const { t } = useTranslation('common');
  
  const [state, setState] = useState<FormState>({
    data: { name: '', email: '', message: '' },
    errors: {},
    isSubmitting: false,
    isSubmitted: false,
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (data: FormData): FormErrors => {
    const errors: FormErrors = {};

    if (!data.name.trim()) {
      errors.name = t('errors.validation.nameRequired');
    } else if (data.name.trim().length < 2) {
      errors.name = t('errors.validation.nameMinLength');
    }

    if (!data.email.trim()) {
      errors.email = t('errors.validation.emailRequired');
    } else if (!validateEmail(data.email)) {
      errors.email = t('errors.validation.emailInvalid');
    }

    if (!data.message.trim()) {
      errors.message = t('errors.validation.messageRequired');
    } else if (data.message.trim().length < 10) {
      errors.message = t('errors.validation.messageMinLength');
    }

    return errors;
  };

  const updateField = (field: keyof FormData, value: string) => {
    setState(prev => ({
      ...prev,
      data: { ...prev.data, [field]: value },
      errors: { ...prev.errors, [field]: undefined }, // Clear field error when user types
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Hidden honeypot field: real visitors leave it empty, bots fill it and Formspree drops those
    const honeypot = new FormData(e.currentTarget).get('_gotcha') ?? '';

    const errors = validateForm(state.data);
    
    if (Object.keys(errors).length > 0) {
      setState(prev => ({ ...prev, errors }));
      return;
    }

    setState(prev => ({ ...prev, isSubmitting: true, errors: {} }));

    try {
      const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
      if (!endpoint) {
        throw new Error('VITE_FORMSPREE_ENDPOINT is not set');
      }

      // Formspree emails the submission to the form owner. The Accept header makes it treat this
      // as an AJAX submission and answer with JSON instead of a redirect or CAPTCHA page
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: state.data.name,
          email: state.data.email,
          message: state.data.message,
          _gotcha: honeypot,
        }),
      });

      // Only report success when Formspree confirms it: { ok: true } on success, { errors: [...] } otherwise
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.ok) {
        throw new Error(`Formspree rejected the submission (status ${response.status}): ${JSON.stringify(result?.errors ?? result)}`);
      }

      setState(prev => ({ 
        ...prev, 
        isSubmitting: false, 
        isSubmitted: true,
        data: { name: '', email: '', message: '' } // Reset form
      }));

      // Reset success message after 5 seconds
      setTimeout(() => {
        setState(prev => ({ ...prev, isSubmitted: false }));
      }, 5000);

    } catch (error) {
      console.error('Formspree error:', error);
      setState(prev => ({ 
        ...prev, 
        isSubmitting: false,
        errors: { message: t('errors.validation.sendFailed') }
      }));
    }
  };

  return {
    data: state.data,
    errors: state.errors,
    isSubmitting: state.isSubmitting,
    isSubmitted: state.isSubmitted,
    updateField,
    handleSubmit,
  };
};