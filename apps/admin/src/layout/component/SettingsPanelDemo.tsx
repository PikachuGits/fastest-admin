import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import SettingsPanel from './Setting/SettingsPanel';

const SettingsPanelDemo: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        设置面板演示
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        这是从HTML转换而来的MUI设置面板组件
      </Typography>
      <Box
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          p: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <SettingsPanel />
      </Box>
    </Container>
  );
};

export default SettingsPanelDemo;