import { toast } from 'react-toastify';

export const showSuccessToast = (text) => {
    toast.success(text, {
      position: toast.POSITION.TOP_RIGHT
    });
  };

 export const showFailToast = (text) => {
    toast.error(text, {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  export const handleImageUpload = async (e) => {
    setLoading(true);
    const file = e.target.files[0];

    // Check if a file was selected
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'ml_default'); // Replace with your Cloudinary upload preset name

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dq0y5qcbv/image/upload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        setUrl(response.data.url);
        setLoading(false)
        showSuccessToast()
      } catch (error) {
        // console.error('Error uploading image to Cloudinary:', error);
        setLoading(false)
        showFailToast()
      }
    }
  };