import { Holiday } from "../Holiday/Holiday";
import { Box, Day } from "./CalenderDay.styled";

interface ICalenderDay {
  date: number;
  currentMonth: boolean;
  holidays?: Record<string, any>[];
}

export const CalenderDay = ({ date, currentMonth, holidays }: ICalenderDay) => {
  console.log(holidays);
  return (
    <Box $currentMonth={currentMonth}>
      <Day>{date}</Day>

      {holidays?.map(({ localName }) => (
        <Holiday localName={localName} />
      ))}
    </Box>
  );
};
