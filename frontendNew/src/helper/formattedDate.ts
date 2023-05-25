const formatUpdatedAt = (updatedAt: string) => {
  const today = new Date();
  const updated = new Date(updatedAt);

  const timeDiff = today.getTime() - updated.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  if (daysDiff === 0) {
    return "Today";
  } else if (daysDiff <= 7) {
    return `Previous ${daysDiff} Days`;
  } else if (daysDiff <= 30) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthIndex = updated.getMonth();
    return monthNames[monthIndex];
  } else {
    return updatedAt;
  }
};

export default formatUpdatedAt;
