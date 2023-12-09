import NextLink from "next/link"
import ShopLayout from "@/components/layout/ShopLayout"
import { Typography, Grid, Chip, Link } from "@mui/material"
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid"

type Props = {}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullname', headerName: 'Nombre completo', width: 300 },
  {
    field: 'paid',
    headerName: 'Pagada',
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return (params.row.paid ?
        <Chip color="success" variant="outlined" label="Pagada" />
        :
        <Chip color="error" variant="outlined" label="Pendiente de pago" />

      )
    }
  },
  {
    field: 'id',
    headerName: 'Visitar Orden',
    width: 100,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => (
      <NextLink href={`/orders/${params.row.id}`} passHref legacyBehavior>
        <Link>Detalle</Link>
      </NextLink>
    )
  }
]

const rows = [
  { id: 1, paid: true, fullname: 'jose Rangel' },
  { id: 2, paid: false, fullname: 'Melissa Florez' },
  { id: 3, paid: true, fullname: 'Eduardo vega' },
  { id: 4, paid: false, fullname: 'Carlos ramigez' },
  { id: 5, paid: true, fullname: 'reyna catalina' },
  { id: 6, paid: false, fullname: 'Alix Andrea' },
  { id: 7, paid: true, fullname: 'Monica Rangel' },
  { id: 8, paid: true, fullname: 'yesid Gomez' },
]
function HistoryPage({ }: Props) {
  return (
    <ShopLayout title="Historial de tus ordenes" pageDescription="Aquí puedes ver el historial de las ordenes que has realizado.">
      <Typography variant="h1" component={'h1'}> Historial de tus ordenes</Typography>

      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5, page: 0 },
              },
            }}
          />
        </Grid>

      </Grid>
    </ShopLayout>
  )
}

export default HistoryPage