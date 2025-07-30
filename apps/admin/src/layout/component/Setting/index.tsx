import { Box, Drawer, List } from "@mui/material";
import SettingsPanel from './SettingsPanel';
import { StyledRightIconButton } from "@/layout/Header/header.styles";
import { Iconify } from "@fastest/components";
import { useState } from "react";
import { DefaultDrawer } from "@fastest/ui";
import DrawerHeader from "../DrawerHeader";
const SettingButton = () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        console.log(newOpen);
        setOpen(newOpen);
    };
    return (
        <DefaultDrawer
            trigger={
                <StyledRightIconButton>
                    <Iconify
                        icon="solar:settings-bold-duotone"
                        className=" animate-spin animate-duration-5000"
                    />
                </StyledRightIconButton>
            }
            // (false:关闭时销毁, true:保持挂载)
            keepMounted={true}
            anchor="right"
            // header={<DrawerHeader />}
            title="设置"
        >
            <SettingsPanel />
        </DefaultDrawer>
    )
}


export default SettingButton;