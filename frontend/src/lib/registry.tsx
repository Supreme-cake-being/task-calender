"use client";

import { useState, ReactNode } from "react";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export default function StyledComponentsRegistry({
  children,
}: {
  children: ReactNode;
}) {
  const [sheet] = useState(() => new ServerStyleSheet());

  return (
    <StyleSheetManager sheet={sheet.instance}>{children}</StyleSheetManager>
  );
}
