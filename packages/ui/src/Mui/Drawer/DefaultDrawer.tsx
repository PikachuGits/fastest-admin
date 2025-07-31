import { Iconify } from "@fastest/components";
import {
  styled,
  type DrawerProps,
  Drawer,
  Box,
  IconButton,
} from "@mui/material";
import React, { useState, type ReactNode, type ReactElement } from "react";

interface TriggerProps {
  onClick?: (event: React.MouseEvent) => void;
}

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  position: "sticky",
  top: 0,
  zIndex: theme.zIndex.drawer,
  backgroundColor: theme.palette.background.paper,
}));
const FooterContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  position: "sticky",
  bottom: 0,
  zIndex: theme.zIndex.drawer,
  backgroundColor: theme.palette.background.paper,
}));
const HeaderLeft = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
});

const HeaderRight = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
});

// 右侧图标按钮样式（带过渡动画）
export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  fontSize: theme.typography.fontSize,
  justifyContent: "center",
  margin: "0 2px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    scale: 1.05,
  },
}));

const DefaultDrawer = (
  props: {
    trigger: ReactElement<TriggerProps>;
    children: ReactNode;
    header?: ReactNode;
  } & DrawerProps
) => {
  const { trigger, children, header, ...rest } = props;
  const [open, setOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    // 保留原有的onClick事件
    if (trigger.props.onClick) {
      trigger.props.onClick(e);
    }
    // 添加打开抽屉的功能
    setOpen(true);
  };

  return (
    <>
      {React.cloneElement(trigger, { onClick: handleClick })}
      <Drawer open={open} onClose={() => setOpen(false)} {...rest}>
        <HeaderContainer>
          {header ?? (
            <>
              <HeaderLeft>
                <div>{rest.title}</div>
              </HeaderLeft>
              <HeaderRight>
                <StyledIconButton onClick={() => setOpen(false)}>
                  <Iconify icon="mingcute:close-line" />
                </StyledIconButton>
              </HeaderRight>
            </>
          )}
        </HeaderContainer>
        {children}
        <FooterContainer>
          <div>123</div>
        </FooterContainer>
      </Drawer>
    </>
  );
};
export default DefaultDrawer;
