import React from 'react';
import { Box, CircularProgress, Backdrop } from '@mui/material';

interface ContentProps {
  loading?: boolean;
  children: React.ReactNode;
}

const LayoutContent: React.FC<ContentProps> = ({
  loading = false,
  children,
}) => {
  return (
    <Box sx={{ position: 'relative', width: '100%', minHeight: '100%' }}>
      {children}
      <Backdrop
        sx={{
          position: 'absolute',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          color: '#fff',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
        }}
        open={loading}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    </Box>
  );
};

export default LayoutContent;
