import { Typography } from "@mui/material";
import { ProductList } from "@/components/products";
import ShopLayout from "@/components/layout/ShopLayout";
import { useProducts } from "@/hooks";
import { Loading } from "@/components/ui";

export default function MenPage() {
  const { products, isLoading } = useProducts('/products?gender=men')

  return (
    <ShopLayout
      title="Teslo Shop - Hombres"
      pageDescription="Los productos tendencias para los hombres en Teslo."
    >

      <Typography variant="h1" component="h1">Hombres</Typography>
      <Typography variant="h2" component="h2" sx={{ mb: 1 }}>Todos los productos de esta categoría</Typography>
      {
        isLoading
          ? <Loading />
          : <ProductList products={products} />
      }

    </ShopLayout>
  )
}
