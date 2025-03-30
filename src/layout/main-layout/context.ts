import React, { RefObject } from "react";

const LayoutContext = React.createContext<{
  collapsed: boolean;
  chatRef: RefObject<HTMLDivElement | null>;
  setCollapsed: (collapsed?: boolean) => void;
}>({
  collapsed: false,
  setCollapsed(_collapsed) {},
  chatRef: {
    current: null,
  },
});

export default LayoutContext;
