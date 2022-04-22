import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material'
import { Typography, Grid, Card, CardContent, Divider, Box, Button, Link, Chip } from '@mui/material'
import NextLink from 'next/link'
import React from 'react'
import { CartList, OrderSummary } from '../../components/cart'
import { ShopLayout } from '../../components/layouts'

const OrderPage = () => {
  return (
    <ShopLayout title={"Resumen de la orden 123123123"} pageDescription={"Resumen de la orden"}>
        <Typography variant="h1" component="h1">Orden ABC132</Typography>
        {/* <Chip
            sx={{my:2}}
            label="Pendiente de pago"
            variant="outlined"
            color="error"
            icon={<CreditCardOffOutlined/>}
        /> */}
        <Chip
            sx={{my:2}}
            label="Pagada"
            variant="outlined"
            color="success"
            icon={<CreditScoreOutlined/>}
        />
        <Grid container>
            <Grid item xs={12} sm={7}>
                <CartList />
            </Grid>
            <Grid item xs={12} sm={5}>
                <Card className="summary-card">
                    <CardContent>
                        <Typography variant="h2">Resumen(3 productos)</Typography>
                        <Divider sx={{my:1}}/>
                        <Box sx={{display: 'flex', justifyContent:'space-between'}}>
                            <Typography variant="subtitle1">Direccion de entrega</Typography>
                            <NextLink href="/checkout/address" passHref>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>
                        <Typography>Direccion de entrega</Typography>
                        <Typography>Direccion de entrega</Typography>
                        <Typography>Direccion de entrega</Typography>
                        <Divider sx={{my:1}}/>
                        
                        <Box sx={{display: 'flex', justifyContent:'end'}}>
                            <NextLink href="/cart" passHref>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>
                        
                        <OrderSummary />
                        <Box sx={{mt:3}}>
                            <h1>Pagar</h1>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default OrderPage