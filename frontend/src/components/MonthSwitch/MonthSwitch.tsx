"use client";

import { Dispatch, SetStateAction } from "react";
import { Box, Button } from "./MonthSwitch.styled";

interface IMonthSwitch {
  setMonth: Dispatch<SetStateAction<number>>;
}

export const MonthSwitch = ({ setMonth }: IMonthSwitch) => {
  return (
    <Box>
      <Button onClick={() => setMonth((prevState) => prevState - 1)}>
        <svg
          width="10px"
          height="10px"
          viewBox="0 -19.04 75.804 75.804"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(-798.203 -587.815)">
            <path
              d="M798.2,589.314a1.5,1.5,0,0,1,2.561-1.06l33.56,33.556a2.528,2.528,0,0,0,3.564,0l33.558-33.556a1.5,1.5,0,1,1,2.121,2.121l-33.558,33.557a5.53,5.53,0,0,1-7.807,0l-33.56-33.557A1.5,1.5,0,0,1,798.2,589.314Z"
              fill="#000000"
            />
          </g>
        </svg>
      </Button>

      <Button onClick={() => setMonth((prevState) => prevState + 1)}>
        <svg
          width="10px"
          height="10px"
          viewBox="0 -19.04 75.803 75.803"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(-619.375 -560.018)">
            <path
              d="M695.178,596.248a1.5,1.5,0,0,1-2.561,1.061l-33.56-33.557a2.53,2.53,0,0,0-3.564,0l-33.558,33.557a1.5,1.5,0,0,1-2.121-2.121l33.557-33.557a5.531,5.531,0,0,1,7.808,0l33.559,33.557A1.494,1.494,0,0,1,695.178,596.248Z"
              fill="#000000"
            />
          </g>
        </svg>
      </Button>
    </Box>
  );
};
