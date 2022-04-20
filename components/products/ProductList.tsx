import { Grid } from "@mui/material"
import { FC, ReactNode } from "react"
import { IProduct } from "../../interfaces";
import { ProductCard } from './';
interface Props{
    children?: ReactNode;
    products:IProduct[]
}
export const ProductList:FC<Props> = ({children, products}) => {
  return (
    <Grid container spacing={4}>
        {
            products.map(product => (
                <ProductCard
                    key={product.slug}
                    product={product}
                />
            ))
        }
    </Grid>
  )
}
