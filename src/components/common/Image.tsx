import { FC } from "react";
import styled from "@emotion/styled";
import { ImageProps } from "next/image";
import NextImage from "next/image";

/*———————————–
  ただの画像(fill-width)
  alt必須だよ
———————————–*/

const StyledImage = styled(NextImage)<ImageProps>({
  verticalAlign: "middle",
  width: "100%",
  height: "auto",
  objectFit: "contain",
});

const Image: FC<ImageProps> = (props) => {
  return <StyledImage {...props} />;
};

export default Image;
