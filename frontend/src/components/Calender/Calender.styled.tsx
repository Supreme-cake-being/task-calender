import styled from "styled-components";

export const Header = styled.header`
  margin-bottom: 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 18px;
  line-height: 24px;
`;

export const FilterInput = styled.input`
  padding: 6px;

  font-size: 14px;
  line-height: 20px;

  background-color: transparent;
  border: 1px solid black;
  border-radius: 8px;
`;

export const CalenderGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
`;

export const DayOfTheWeek = styled.div`
  display: flex;
  justify-content: center;
`;
