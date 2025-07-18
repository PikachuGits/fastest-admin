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
    <Box className="dark:bg-gray-900">
      <Grid
        container
        spacing={1}
        className="p-2 rounded-md"
        columns={24}
      >
        {Object.keys(iconSets).map((key) => (
          <Grid
            key={key}
            size={{ xs: 6, sm: 4, md: 2, lg: 1 }} // 每行图标个数响应式控制
            onClick={() => onClick(key as IconifyName)}
            className="aspect-square  rounded-md border border-white dark:border-black"
          >
            <Box className="rounded-md bg-gray-100 h-full w-full flex items-center justify-center hover:text-gray-800 dark:bg-black cursor-pointer">
              <Iconify
                icon={key as IconifyName}
                className="text-xl dark:text-gray-500"
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Index;
