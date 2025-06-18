import { Box } from "./CalenderDay.styled";

interface ICalenderDay {
  date: number;
  currentMonth: boolean;
}

export const CalenderDay = ({ date, currentMonth }: ICalenderDay) => {
  return <Box currentMonth={currentMonth}>{date}</Box>;
};
