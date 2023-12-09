import NextLink from "next/link"
import ShopLayout from "@/components/layout/ShopLayout"
import { RemoveShoppingCartOutlined } from "@mui/icons-material"
import { Box, Button, Link, Typography } from "@mui/material"

interface Props { }

function EmptyPage({ }: Props) {
  return (
    <ShopLayout title="Carrito vacío" pageDescription="No hay productos agregados al carrito">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }} justifyContent="center" alignItems="center" height="calc(100vh - 200px)">
        <Box display="flex" alignItems="center">
          <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
          <Typography ml={1}>Su carrito está vacío.</Typography>
        </Box>

        <NextLink href="/" passHref legacyBehavior>
          <Button color="secondary" size="medium">
            Volver
          </Button>
        </NextLink>
      </Box>


    </ShopLayout>
  )
}

export default EmptyPage