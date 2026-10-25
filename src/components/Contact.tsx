import { Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SectionHeader from './SectionHeader';
import { useContactForm } from '../hooks/useContactForm';
import { PROFILE } from '../data/profile';

type FieldName = 'name' | 'email' | 'message';

interface FieldProps {
  name: FieldName;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (name: FieldName, value: string) => void;
}

const Field = ({ name, label, placeholder, value, error, onChange }: FieldProps) => {
  const className = `w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent transition-colors ${
    error
      ? 'border-red-300 dark:border-red-600 focus:ring-red-500'
      : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500'
  } dark:bg-gray-700 dark:text-white`;
  const inputProps = {
    id: name,
    name,
    value,
    placeholder,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(name, e.target.value),
  };

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      {name === 'message' ? (
        <textarea {...inputProps} rows={4} className={`${className} resize-none`} />
      ) : (
        <input {...inputProps} type={name === 'email' ? 'email' : 'text'} className={className} />
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
          <AlertCircle className="h-4 w-4" />
          {error}
        </p>
      )}
    </div>
  );
};

const Contact = () => {
  const { t } = useTranslation('contact');
  const { 
    data, 
    errors, 
    isSubmitting, 
    isSubmitted, 
    updateField, 
    handleSubmit 
  } = useContactForm();

  return (
    <section id="contact" className="py-20 bg-linear-to-br from-gray-50 to-green-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title={t('title')} subtitle={t('subtitle')} subtitleClassName="max-w-2xl mx-auto" />

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  {t('getInTouch.title')}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                  {t('getInTouch.description')}
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow duration-200 group"
                >
                  <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-full group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
                    <Mail className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{t('details.email')}</p>
                    <p className="text-gray-900 dark:text-white font-medium">{PROFILE.email}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-full">
                    <MapPin className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{t('details.location')}</p>
                    <p className="text-gray-900 dark:text-white font-medium">{PROFILE.location}</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-6">
                <p className="text-gray-600 dark:text-gray-400 mb-4">{t('details.connectWith')}</p>
                <div className="flex gap-4">
                  <a
                    href={PROFILE.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white dark:bg-gray-700 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900 hover:shadow-md transition-all duration-200"
                    aria-label={t('details.linkedInProfile')}
                  >
                    <svg className="h-6 w-6 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                {t('form.title')}
              </h3>
              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <p className="text-green-800 dark:text-green-200">
                    {t('form.successMessage')}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Formspree honeypot: hidden from people, filled in by bots */}
                <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                <Field
                  name="name"
                  label={t('form.labels.name')}
                  placeholder={t('form.placeholders.name')}
                  value={data.name}
                  error={errors.name}
                  onChange={updateField}
                />
                <Field
                  name="email"
                  label={t('form.labels.email')}
                  placeholder={t('form.placeholders.email')}
                  value={data.email}
                  error={errors.email}
                  onChange={updateField}
                />
                <Field
                  name="message"
                  label={t('form.labels.message')}
                  placeholder={t('form.placeholders.message')}
                  value={data.message}
                  error={errors.message}
                  onChange={updateField}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-primary-600 hover:bg-primary-700'
                  } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                      {t('form.button.sending')}
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      {t('form.button.send')}
                    </>
                  )}
                </button>
              </form>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
                {t('form.directEmail')} <a href={`mailto:${PROFILE.email}`} className="text-primary-600 dark:text-primary-400 underline underline-offset-2 hover:no-underline">{PROFILE.email}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
