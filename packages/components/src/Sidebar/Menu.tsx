import React, { memo, useRef } from "react";
import { MenuStoreProvider } from "./context/MenuStoreContext";
import { MenuInternalComponent } from "./components";
import type { MenuProps } from "./types";
import { nanoid } from "nanoid";

const MenuComponent: React.FC<MenuProps & { id?: string }> = (props) => {
  const idRef = useRef(props.id || nanoid());

  return (
    <MenuStoreProvider id={idRef.current}>
      <MenuInternalComponent {...props} menuId={idRef.current} />
    </MenuStoreProvider>
  );
};

export const Menu = memo(MenuComponent);

export default Menu;
