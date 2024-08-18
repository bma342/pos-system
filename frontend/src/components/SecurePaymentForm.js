import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const SecurePaymentForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Here, you would typically send the data to your secure backend
      // Never log or store full credit card details on the frontend
      console.log('Submitting payment info securely');
      // Reset form or show success message
    } catch (error) {
      console.error('Error processing payment', error);
      // Show error message to user
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="cardNumber" className="block mb-2">Card Number</label>
        <input
          type="text"
          id="cardNumber"
          {...register('cardNumber', { 
            required: 'Card number is required',
            pattern: {
              value: /^[0-9]{16}$/,
              message: 'Invalid card number'
            }
          })}
          className="w-full p-2 border rounded"
        />
        {errors.cardNumber && <span className="text-red-500">{errors.cardNumber.message}</span>}
      </div>

      <div className="mb-4">
        <label htmlFor="expiryDate" className="block mb-2">Expiry Date</label>
        <input
          type="text"
          id="expiryDate"
          {...register('expiryDate', { 
            required: 'Expiry date is required',
            pattern: {
              value: /^(0[1-9]|1[0-2])\/[0-9]{2}$/,
              message: 'Invalid expiry date (MM/YY)'
            }
          })}
          className="w-full p-2 border rounded"
          placeholder="MM/YY"
        />
        {errors.expiryDate && <span className="text-red-500">{errors.expiryDate.message}</span>}
      </div>

      <div className="mb-4">
        <label htmlFor="cvv" className="block mb-2">CVV</label>
        <input
          type="text"
          id="cvv"
          {...register('cvv', { 
            required: 'CVV is required',
            pattern: {
              value: /^[0-9]{3,4}$/,
              message: 'Invalid CVV'
            }
          })}
          className="w-full p-2 border rounded"
        />
        {errors.cvv && <span className="text-red-500">{errors.cvv.message}</span>}
      </div>

      <button 
        type="submit" 
        className="w-full bg-blue-500 text-white p-2 rounded"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Processing...' : 'Submit Payment'}
      </button>
    </form>
  );
};

export default SecurePaymentForm;
