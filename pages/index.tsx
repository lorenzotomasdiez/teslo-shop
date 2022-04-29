import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLayout } from '../components/layouts'
import { ProductList } from '../components/products'
import { FullScreenLoading } from '../components/ui'
import {initialData} from '../database/products'
import { useProducts } from '../hooks'


const Home: NextPage = () => {
  const { products, isLoading} = useProducts('/products')
  return (
    <ShopLayout 
      title={'Teslo-Shop - Home'} 
      pageDescription={'Encuentra la mejor ropa del mundo'}
    >
      <Typography variant="h1" component="h1">Tienda</Typography>
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

export default Home
