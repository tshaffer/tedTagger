export const formatISOString = (ISOString: string): string => {
  
  const date = new Date(ISOString);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

  return formattedDate;
};

// Example usage
// const isoString = new Date().toISOString();
// const formattedDate = formatISOString(isoString);
// console.log(formattedDate);
