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

  const timePast = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now - past) / 1000);

    const intervals = [
      { label: 'yr', seconds: 31536000 },
      { label: 'mth', seconds: 2592000 },
      { label: 'wk', seconds: 604800 },
      { label: 'day', seconds: 86400 },
      { label: 'hr', seconds: 3600 },
      { label: 'min', seconds: 60 },
      { label: 'sec', seconds: 1 }
    ];

    let result = '';
    let remainingSeconds = diffInSeconds;

    for (let i = 0; i < intervals.length; i++) {
      const interval = intervals[i];
      const count = Math.floor(remainingSeconds / interval.seconds);
      
      if (count > 0) {
        result += `${count} ${interval.label}${count > 1 ? 's' : ''} `;
        remainingSeconds %= interval.seconds;
        
        if (i < intervals.length - 1) {
          const nextCount = Math.floor(remainingSeconds / intervals[i + 1].seconds);
          if (nextCount > 0) {
            result += `${nextCount} ${intervals[i + 1].label}${nextCount > 1 ? 's' : ''} `;
          }
        }
        
        break;
      }
    }

    return result.trim() + ' ago';
  };

  return {
    formatDate,
    currentAge,
    currentYear,
    initialsFromName,
    timePast
  };
};