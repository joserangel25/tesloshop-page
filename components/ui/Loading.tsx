import { Box, CircularProgress, Typography } from "@mui/material"

interface Props { }

export const Loading = ({ }: Props) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column' } }} justifyContent="center" alignItems="center" height="calc(100vh - 200px)">
      <Typography>Cargando...</Typography>
      <CircularProgress thickness={2} />
    </Box>

  )
}