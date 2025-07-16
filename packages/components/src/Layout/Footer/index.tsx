import React from 'react';
import { Box, Typography } from '@mui/material';

interface FooterProps {
  height: number;
}

const LayoutFooter: React.FC<FooterProps> = ({ height }) => {
  return (
    <Box
      sx={{
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTop: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © 2024 Admin Dashboard. All rights reserved.
      </Typography>
    </Box>
  );
};

export default LayoutFooter;
