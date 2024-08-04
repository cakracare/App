import { useState } from 'react';

const useForm = (initialState: any) => {
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState<any>({});

    const handleInputChange = (name: string, value: string) => {
        setFormData({
            ...formData,
            [name]: value || '',
        });
        clearFieldError(name);
    };

    const setFieldError = (name: string, error: string) => {
        setErrors((prevErrors: any) => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    const clearFieldError = (name: string) => {
        setErrors((prevErrors: any) => {
            const { [name]: _, ...rest } = prevErrors;
            return rest;
        });
    };

    return {
        formData,
        handleInputChange,
        errors,
        setFieldError,
        clearFieldError,
    };
};

export default useForm;
