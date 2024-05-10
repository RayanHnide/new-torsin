import { toast } from 'react-hot-toast';

export const handleErrorMessage = (err) => {
    if (
        err
        //  &&
        // (err.response.data.success === false || err.response.data.status === false) &&
        // err.response.data.message
    ) {
        toast.error(err.response?.data?.error?.errorMessage, {
            position: "top-right",
            style: {
                padding: '16px',
                color: '#3c5f4b',
                marginRight: '25px',
            },
        })
    } else {
        toast.error(err.response?.data?.error?.errorMessage, {
            position: "top-right",
            style: {
                padding: '16px',
                color: '#3c5f4b',
                marginRight: '25px',
            },
        })
    }
};