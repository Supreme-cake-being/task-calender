import styled from "styled-components";

export const Box = styled.div<{ $currentMonth: boolean }>`
  min-height: 120px;

  padding: 8px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  background-color: ${({ $currentMonth }) => ($currentMonth ? "#ddd" : "#bbb")};
  border-radius: 4px;
`;

export const Day = styled.p`
  font-size: 12px;
  line-height: 16px;
`;
