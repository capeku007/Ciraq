// useFormatDate.js
export const useFormatDate = () => {
    const formatDate = (dateString) => {
      const dateObj = new Date(dateString);
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      return dateObj.toLocaleString('en-GB', options);
    };
  
    return {
      formatDate,
    };
  };