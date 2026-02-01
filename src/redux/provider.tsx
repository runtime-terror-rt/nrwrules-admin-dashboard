"use client";

import { Provider } from "react-redux";

import { getStore } from "./store/store";
export const store = getStore();

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
