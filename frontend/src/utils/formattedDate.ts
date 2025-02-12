const formatUpdatedAt = (updatedAt: string) => {
  const today = new Date();
  const updated = new Date(updatedAt);

  const timeDiff = today.getTime() - updated.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  if (updated.getFullYear() !== today.getFullYear()) {
    return updated.getFullYear().toString();
  } else if (daysDiff === 1) {
    return 'Today';
  } else if (daysDiff <= 7) {
    return `Past 7 days`;
  } else {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const monthIndex = updated.getMonth();
    return monthNames[monthIndex];
  }
};

export default formatUpdatedAt;
