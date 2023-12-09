import { Typography } from "@mui/material";
import { ProductList } from "@/components/products";
import ShopLayout from "@/components/layout/ShopLayout";
import { useProducts } from "@/hooks";
import { Loading } from "@/components/ui";

export default function WomenPage() {
  const { products, isLoading } = useProducts('/products?gender=women')

  return (
    <ShopLayout
      title="Teslo Shop - Mujeres"
      pageDescription="Los productos tendencias para las mujeres en Teslo."
    >

      <Typography variant="h1" component="h1">Mujeres</Typography>
      <Typography variant="h2" component="h2" sx={{ mb: 1 }}>Todos los productos de esta categoría</Typography>
      {
        isLoading
          ? <Loading />
          : <ProductList products={products} />
      }

    </ShopLayout>
  )
}
