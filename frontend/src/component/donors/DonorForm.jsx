import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { User, Mail, MapPin, DollarSign, Heart, Calendar, MessageSquare, Upload, Globe, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios'; // Make sure to install axios: npm install axios

// Main App Component
export default function DonorForm() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center font-sans p-4">
      <DonationForm />
    </div>
  );
}

// Reusable Input Component for clean code
const FormInput = ({ icon, label, name, register, errors, type = 'text', validation = {}, ...props }) => {
  const Icon = icon;
  return (
    <div className="relative">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1 ml-1">{label}</label>
      <div className="relative rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
          <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          id={name}
          name={name}
          type={type}
          {...register(name, validation)}
          {...props}
          className={`block w-full pl-10 pr-3 py-2.5 border ${errors[name] ? 'border-red-500' : 'border-gray-300'} rounded-lg transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        />
      </div>
      {errors[name] && <p className="mt-1 text-xs text-red-600">{errors[name].message}</p>}
    </div>
  );
};

// Reusable Select Component
const FormSelect = ({ icon, label, name, register, errors, options, validation = {}, ...props }) => {
    const Icon = icon;
    return (
        <div className="relative">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1 ml-1">{label}</label>
            <div className="relative rounded-md shadow-sm">
                 <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <select
                    id={name}
                    name={name}
                    {...register(name, validation)}
                    {...props}
                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors[name] ? 'border-red-500' : 'border-gray-300'} rounded-lg transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none bg-white`}
                >
                    <option value="">Select a purpose</option>
                    {options.map(option => (
                        <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                    ))}
                </select>
            </div>
            {errors[name] && <p className="mt-1 text-xs text-red-600">{errors[name].message}</p>}
        </div>
    );
};


// Main Donation Form Component
function DonationForm() {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'
  const [submissionError, setSubmissionError] = useState(null);

  const donorImageFile = watch('donorImage');

  useEffect(() => {
    if (donorImageFile && donorImageFile.length > 0) {
      const file = donorImageFile[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }, [donorImageFile]);

  const onSubmit = async (data) => {
    setSubmissionStatus('submitting');
    setSubmissionError(null);

    // Use FormData to handle file uploads
    const formData = new FormData();

    // Append all form fields to FormData object
    Object.keys(data).forEach(key => {
        if (key === 'donorImage') {
            // Check if a file was selected
            if (data.donorImage && data.donorImage.length > 0) {
                formData.append('donorImage', data.donorImage[0]);
            }
        } else {
            formData.append(key, data[key]);
        }
    });
    
    // Append additional info for the backend
    formData.append('status', 'completed');
    formData.append('transactionId', `txn_${Date.now()}`);

    try {
        // Replace with your actual backend API endpoint
        const response = await axios.post('https://your-backend-api.com/donations', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('Backend Response:', response.data);
        
        // Reset form and set status to success
        reset();
        setImagePreview(null);
        setSubmissionStatus('success');

    } catch (error) {
        console.error('Submission Error:', error);
        setSubmissionError('There was an error submitting your donation. Please try again.');
        setSubmissionStatus('error'); // Update status to reflect error
    }
  };

  const handleNewDonation = () => {
    setSubmissionStatus('idle');
    setSubmissionError(null);
  }

  if (submissionStatus === 'success') {
      return (
         <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center flex flex-col items-center">
             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-5">
                 <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Thank You!</h2>
            <p className="text-gray-600 mb-8">Your generous donation has been received. We are grateful for your support.</p>
            <button
              onClick={handleNewDonation}
              className="w-full sm:w-auto inline-flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
            >
              Make Another Donation
            </button>
        </div>
      );
  }

  return (
    <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg overflow-hidden md:flex">
      <div className="md:w-1/2 p-8 md:p-12 bg-indigo-600 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-4">Make a Difference Today</h2>
            <p className="text-indigo-200 leading-relaxed">
              Your contribution can bring hope and change to lives. Every donation, big or small, creates a ripple of kindness. Join us in our mission to build a better world.
            </p>
          </div>
          <div className="mt-8 text-center">
            <Heart className="w-24 h-24 text-indigo-400 mx-auto opacity-50" />
          </div>
      </div>
      
      <div className="md:w-1/2 p-8 md:p-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Donor Information</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormInput
              icon={User}
              label="Full Name"
              name="fullName"
              placeholder="John Doe"
              register={register}
              errors={errors}
              validation={{ required: 'Full name is required' }}
            />
             <FormInput
              icon={DollarSign}
              label="Amount (USD)"
              name="amount"
              type="number"
              placeholder="50"
              register={register}
              errors={errors}
              validation={{ 
                required: 'Donation amount is required',
                valueAsNumber: true,
                min: { value: 1, message: 'Amount must be at least $1' }
              }}
            />
          </div>

          <FormInput
            icon={Mail}
            label="Email Address"
            name="email"
            type="email"
            placeholder="you@example.com"
            register={register}
            errors={errors}
            validation={{ 
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Entered value does not match email format'
              }
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
             <FormInput
                icon={Globe}
                label="Country"
                name="country"
                placeholder="United States"
                register={register}
                errors={errors}
            />
            <FormInput
                icon={MessageSquare}
                label="WhatsApp Number"
                name="whatsapp"
                placeholder="+1 123 456 7890"
                register={register}
                errors={errors}
            />
          </div>

           <div className="relative">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1 ml-1">Address</label>
                <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 pt-2.5 flex items-start">
                        <MapPin className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <textarea
                        id="address"
                        name="address"
                        rows="3"
                        {...register('address')}
                        placeholder="123 Main St, Anytown, USA"
                        className={`block w-full pl-10 pr-3 py-2.5 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    ></textarea>
                </div>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
             <FormSelect
                icon={Heart}
                label="Purpose of Donation"
                name="purpose"
                register={register}
                errors={errors}
                options={["education", "health", "orphans", "general", "funeral"]}
             />
             <FormInput
                icon={Calendar}
                label="Donation Date"
                name="donationDate"
                type="date"
                register={register}
                errors={errors}
             />
          </div>

           <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Donor Image (Optional)</label>
              <div className="mt-1 flex items-center justify-center w-full">
                  <label htmlFor="donorImage" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                      {imagePreview ? (
                          <img src={imagePreview} alt="Donor preview" className="h-full w-full object-contain p-2" />
                      ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-2 text-gray-500"/>
                              <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span></p>
                              <p className="text-xs text-gray-500">PNG, JPG (MAX. 800x400px)</p>
                          </div>
                      )}
                      <input id="donorImage" type="file" {...register('donorImage')} className="hidden" accept="image/png, image/jpeg" />
                  </label>
              </div>
          </div>
          
          {submissionStatus === 'error' && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-red-700">{submissionError}</p>
                    </div>
                </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={submissionStatus === 'submitting'}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {submissionStatus === 'submitting' ? 'Processing...' : 'Donate Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

