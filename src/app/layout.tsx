import * as React from 'react';
import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';

import './global.css'
import AppNav from '@/components/AppNav';
import { Box } from '@mui/material';

export const metadata: Metadata = {
  title: '计算工具集',
  description: '计算工具集',
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: false }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box>
              <AppNav />
              {props.children}
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
