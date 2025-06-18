export const getMonthDays = (month: number, year: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startDay = firstDay.getDay(); // index of weekday (0-6)
  const daysInMonth = lastDay.getDate();

  const days = [];

  // Days from previous month (for padding)
  const prevMonthLastDate = new Date(year, month, 0).getDate();
  for (let i = startDay - 1; i >= 0; i--) {
    days.push({
      date: prevMonthLastDate - i,
      currentMonth: false,
    });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: i,
      currentMonth: true,
    });
  }

  // Days from next month (to fill the grid to 42 cells total)
  while (days.length < 42) {
    days.push({
      date: days.length - (startDay + daysInMonth) + 1,
      currentMonth: false,
    });
  }

  return days;
};
