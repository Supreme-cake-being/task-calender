import styled from "styled-components";

export const Header = styled.header`
  margin-bottom: 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 18px;
  line-height: 24px;
`;

export const CalenderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
`;

export const DayOfTheWeek = styled.div`
  display: flex;
  justify-content: center;
`;
