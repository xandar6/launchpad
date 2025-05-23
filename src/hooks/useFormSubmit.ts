import { useState } from 'react';

interface FormSubmitOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  mockSubmit?: boolean; // For development/testing without a backend
}

/**
 * Custom hook for handling form submissions with loading state and error handling
 */
export function useFormSubmit<T>({ 
  onSuccess, 
  onError, 
  mockSubmit = true 
}: FormSubmitOptions<T> = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const submitForm = async (values: T, submitFn?: (data: T) => Promise<unknown>) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      if (mockSubmit) {
        // Simulate API call with a delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Form submitted with values:', values);
      } else if (submitFn) {
        // Use the provided submit function
        await submitFn(values);
      } else {
        throw new Error('No submit function provided and mockSubmit is false');
      }
      
      setIsSubmitted(true);
      onSuccess?.(values);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An unknown error occurred');
      setError(error);
      onError?.(error);
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setIsSubmitting(false);
    setIsSubmitted(false);
    setError(null);
  };

  return {
    isSubmitting,
    isSubmitted,
    error,
    submitForm,
    reset
  };
}
