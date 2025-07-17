import { Iconify, type IconifyName, iconSets } from "@fastest/components";
import { useSnackbar } from "notistack";
import "./index.less";
import { Box, Grid } from "@mui/material";

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
      <Grid
        container
        spacing={1}
        className="border-1 border-gray-200 p-2 rounded-md"
        columns={24}
      >
        {Object.keys(iconSets).map((key) => (
          <Grid
            key={key}
            size={{ xs: 6, sm: 4, md: 2, lg: 1 }} // 每行图标个数响应式控制
            onClick={() => onClick(key as IconifyName)}
            className="aspect-square"
          >
            <Box className="text-gray-500 rounded-md h-full w-full flex items-center justify-center hover:text-gray-800 bg-white cursor-pointer">
              <Iconify
                icon={key as IconifyName}
                className="text-xl color-gray-500"
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Index;
