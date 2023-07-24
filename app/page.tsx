import { Button, Card, CardActions, CardContent, Container, Grid, Link, Typography } from "@mui/material"

interface Page {
  name: string,
  path: string,
}

const pages: Page[] = [{
  name: '物质的量浓度-浓度计算',
  path: '/concentration',
}, {
  name: '物质的量浓度-体积-质量计算',
  path: '/mass-concentration',
}]

export default function Home() {
  return (
    <main>
      <Container>
        <Grid container spacing={1}  alignItems={"center"} justifyContent={"center"}>
          {pages.map((page: Page) => (
            <Grid item key={page.path} xs={3} md>
              <Card sx={{ minWidth: 300, minHeight: 150 }}>
                <Link href={page.path} underline={"none"}>
                  <CardContent>
                    <Typography alignContent={'center'}>{page.name}</Typography>
                  </CardContent>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  )
}