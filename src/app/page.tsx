import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import { Paper, Stack } from '@mui/material';

import styles from './page.module.css';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={{width: '100%'}}>
        <Stack spacing={2}>
          <Paper className={styles.list_item}>
            <Link href="/concentration" color="primary" underline='none' component={NextLink}>物质的量浓度-浓度计算</Link>
          </Paper>
          <Paper className={styles.list_item}>
            <Link href="/mass-concentration" color="primary" underline='none' component={NextLink}>物质的量浓度-体积-质量计算</Link>
          </Paper>
        </Stack>
      </Box>
    </Container>
  );
}
