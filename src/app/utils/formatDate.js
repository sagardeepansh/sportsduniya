// utils/formatDate.js
const { format, differenceInHours, parseISO } = require('date-fns');

function formatCustomDate(dateString) {
  const date = parseISO(dateString);
  const now = new Date();
  const diffInHours = differenceInHours(now, date);

  if (diffInHours < 1) {
    return 'Just now';
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  } else {
    return format(date, 'MMMM d, yyyy'); // Example: April 17, 2023
  }
}

module.exports = { formatCustomDate };
