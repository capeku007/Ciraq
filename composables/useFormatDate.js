// useFormatDate.js
export const useFormatDate = () => {
  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return dateObj.toLocaleString('en-GB', options);
  };

  const currentYear = (dateString) => {
    const today = new Date();
    const givenDate = new Date(dateString);
    const timeDiff = Math.abs(today.getTime() - givenDate.getTime());
    const yearsDiff = Math.floor(timeDiff / (1000 * 3600 * 24 * 365.25));
    return `Year ${yearsDiff} `;
  };

  const initialsFromName = (firstName, lastName) => {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
    return `${firstInitial}${lastInitial}`;
  };


  const currentAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return `${age}yrs`;
  };

  return {
    formatDate,
    currentAge,
    currentYear,
    initialsFromName
  };
};