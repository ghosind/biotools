import * as React from 'react';
import { AppBar, Box, Link, Toolbar } from '@mui/material';
import NextLink from 'next/link';

export default function AppNav() {
  return (
    <Box sx={{ flexGrow: 1 }} paddingBottom={2}>
      <AppBar position='static'>
        <Toolbar>
          <Link href='/' color='white' underline='none' component={NextLink}>首页</Link>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
