import { FC, ReactNode, useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import styled from "@emotion/styled";
import theme from "@/styles/theme";

/*———————————–
  サイコロなロードサイクル
  Copyright (c) 2023 by vivek prajapati (https://codepen.io/Vivekp1118/pen/wvxLLqv)
———————————–*/
type Props = {};

const Dice = styled(Box)`
  margin: 30px;
  padding: 10px;
  height: 45px;
  width: 45px;
  background: #ea2317;
  color: white;
  display: grid;
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
  justify-items: center;
  align-items: center;
  border-radius: 12px;
  animation: rotate-anim 1.5s ease infinite;
  position: relative;

  @keyframes rotate-anim {
    0% {
      transform: rotate(0deg);
      box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    }
    50% {
      transform: rotate(360deg);
      border-radius: 50%;
      box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.2);
    }
    100% {
      transform: rotate(720deg);
      box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    }
  }
`;

const Dot = styled(Box)`
  display: block;
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
  animation: dot-anim 1.5s ease infinite;

  @keyframes dot-anim {
    0% {
      opacity: 1;
    }
    33% {
      opacity: 0;
    }
    66% {
      opacity: 0;
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
  }
`;

const grids = [
  styled(Dot)`
    grid-row: 1;
    grid-column: 1;
  `,
  styled(Dot)`
    grid-row: 2;
    grid-column: 1;
  `,
  styled(Dot)`
    grid-row: 3;
    grid-column: 1;
  `,
  styled(Dot)`
    grid-row: 1;
    grid-column: 2;
  `,
  styled(Dot)`
    grid-row: 2;
    grid-column: 2;
  `,
  styled(Dot)`
    grid-row: 3;
    grid-column: 2;
  `,
  styled(Dot)`
    grid-row: 1;
    grid-column: 3;
  `,
  styled(Dot)`
    grid-row: 2;
    grid-column: 3;
  `,
  styled(Dot)`
    grid-row: 3;
    grid-column: 3;
  `,
];

const diceSides = [
  [5],
  [1, 9],
  [1, 5, 9],
  [1, 3, 7, 9],
  [1, 3, 5, 7, 9],
  [1, 2, 3, 7, 8, 9],
  [],
];

const DiceRoll: FC<Props> = () => {
  const getIndex = () => Math.floor(Math.random() * 6);
  useEffect(() => {
    setDiceSide(getIndex);
  }, []);
  const [diceSide, setDiceSide] = useState(0);
  const targetDiceSide = diceSides[diceSide];
  return (
    <Dice>
      {targetDiceSide.map((i) => {
        const TargetDot = grids[i - 1];
        return <TargetDot key={i} />;
      })}
    </Dice>
  );
};
export default DiceRoll;
