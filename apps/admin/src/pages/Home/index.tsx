import { Iconify, type IconifyName, iconSets } from "@fastest/components";
import { useSnackbar } from "notistack";
import "./index.less";
import { Box, Grid } from "@mui/material";
import { MenuExamples } from "@fastest/components";

const Index = () => {
  const { enqueueSnackbar } = useSnackbar();

  const onClick = (key: IconifyName) => {
    console.log(key);

    window.navigator.clipboard.writeText(key);
    enqueueSnackbar(
      <span className="flex items-center gap-1">
        <Iconify icon={key as IconifyName} className="text-xl" />
        <span>已复制到剪切板</span>
      </span>,
      { variant: "default" }
    );
  };

  return (
    <Box className="bg-gray-100">
      <MenuExamples />
    </Box>
  );
};

export default Index;
