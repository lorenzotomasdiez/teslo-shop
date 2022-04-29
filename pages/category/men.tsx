import { Typography } from '@mui/material'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import { FullScreenLoading } from '../../components/ui'
import { useProducts } from '../../hooks'

const MenPage = () => {
    const { products, isLoading} = useProducts('/products?gender=men')
    return (
      <ShopLayout
        title={'Teslo-Shop - Men Category'} 
        pageDescription={'Encuentra la mejor ropa del mundo'}
      >
        <Typography variant="h1" component="h1">Men</Typography>
        <Typography variant="h2" sx={{mb:1}}>Todos los productos</Typography>
  
        {
          isLoading 
            ? (<FullScreenLoading />)
            : (  
              <ProductList products={products}/>
            )
        }
  
      </ShopLayout>
    )
}

export default MenPage