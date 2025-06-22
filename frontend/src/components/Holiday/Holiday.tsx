"use client";

import { Box, Bar, HolidayName } from "./Holiday.styled";

interface IHoliday {
  localName: string;
}

export const Holiday = ({ localName }: IHoliday) => {
  return (
    <Box>
      <Bar />
      <HolidayName>{localName}</HolidayName>
    </Box>
  );
};
