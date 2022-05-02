import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import { FC, useContext } from "react";
import { CartContext } from "../../context";
import { ItemCounter } from "../ui";
import { ICartProduct } from '../../interfaces/cart';

interface Props{
    editable?:boolean;
}
export const CartList:FC<Props> = ({editable = false}) => {
  const {cart, updateCartQuantity, removeCartProduct} = useContext(CartContext);

  const onChangeQuantity = (product:ICartProduct, newQuantity:number) => {
      product.quantity = newQuantity;
      updateCartQuantity(product);
  }

  const onRemoveCartProduct = (product:ICartProduct) => {
      removeCartProduct(product);
  }
  return (
    <>
        {
            cart.map(product => (
                <Grid container key={product.slug+product.size} spacing={2} sx={{mb:1}}>
                    <Grid item xs={3}>
                        <NextLink href={`/product/${product.slug}`} passHref>
                            <Link>
                                <CardActionArea>
                                    <CardMedia
                                        image={`/products/${product.image}`}
                                        component='img'
                                        sx={{borderRadius:'5px'}}
                                    />
                                </CardActionArea>
                            </Link>
                        </NextLink>
                    </Grid>
                    <Grid item xs={7}>
                        <Box display="flex" flexDirection="column">
                            <Typography variant="body1">{product.title}</Typography>
                            <Typography variant="body1">Talla: <strong>{product.size}</strong></Typography>
                            {/* Condicional */}
                            {
                                editable 
                                    ? <ItemCounter 
                                        currentValue={product.quantity} 
                                        maxValue={5} 
                                        updatedQuantity={(value) => onChangeQuantity(product, value)}
                                        />
                                    : <Typography variant="body1">{product.quantity}</Typography>

                            }
                        </Box>
                    </Grid>
                    <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
                        <Typography variant="subtitle1">{`$${product.price}`}</Typography>
                        {/* EDITABLE */}
                        {
                            editable && (
                                <Button variant='text' color='secondary' onClick={() => onRemoveCartProduct(product)}>
                                    Remove
                                </Button>
                            )
                        }
                    </Grid>
                </Grid>
            ))
        }
    </>
  )
}
