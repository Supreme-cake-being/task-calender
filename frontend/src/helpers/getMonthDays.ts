export const getMonthDays = (month: number, year: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay(); // 0 (Sun) to 6 (Sat)
  const daysInMonth = lastDay.getDate();

  const days = [];

  // Days from previous month (for padding)
  const prevMonthLastDate = new Date(year, month, 0).getDate();
  for (let i = startDay - 1; i >= 0; i--) {
    const day = prevMonthLastDate - i;
    const dateObj = new Date(year, month - 1, day);

    days.push({
      day,
      date: formatDate(dateObj),
      currentMonth: false,
    });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const dateObj = new Date(year, month, i);
    days.push({
      day: i,
      date: formatDate(dateObj),
      currentMonth: true,
    });
  }

  // Days from next month (to fill the grid to 42 cells total)
  let i = 1;
  while (days.length < 42) {
    const dateObj = new Date(year, month + 1, i);
    days.push({
      day: i,
      date: formatDate(dateObj),
      currentMonth: false,
    });
    i++;
  }

  return days;
};

const formatDate = (dateObj: Date) => {
  const y = dateObj.getFullYear();
  const m = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const d = dateObj.getDate().toString().padStart(2, "0");
  return `${y}-${m}-${d}`;
};
