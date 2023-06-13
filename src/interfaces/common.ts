import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";

export type NextPageWithLayout<Props = {}> = NextPage<Props> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
