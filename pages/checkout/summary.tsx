import { Typography, Grid, Card, CardContent, Divider, Box, Button, Link } from "@mui/material"
import Cookies from "js-cookie"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import { CartList, OrderSummary } from "../../components/cart"
import { ShopLayout } from "../../components/layouts"
import { CartContext } from "../../context"
import { countries } from "../../utils"

const SummaryPage = () => {
  const router = useRouter();
  const {shippingAddress, numberOfItems} = useContext(CartContext);

  useEffect(() => {
    if(!Cookies.get('firstName')){
        router.push('/checkout/address')
    }
  },[router])

  if(!shippingAddress){
      return <></>
  }
  
  const {firstName, lastName, address, city, country, phone, zip} = shippingAddress;
  return (
    <ShopLayout title={"Resumen de la orden"} pageDescription={"Resumen de la orden"}>
        <Typography variant="h1" component="h1">Resumen de la orden</Typography>
        <Grid container>
            <Grid item xs={12} sm={7}>
                <CartList />
            </Grid>
            <Grid item xs={12} sm={5}>
                <Card className="summary-card">
                    <CardContent>
                        <Typography variant="h2">Resumen({numberOfItems} producto/s)</Typography>
                        <Divider sx={{my:1}}/>
                        <Box sx={{display: 'flex', justifyContent:'space-between'}}>
                            <Typography variant="subtitle1">Direccion de entrega</Typography>
                            <NextLink href="/checkout/address" passHref>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>
                        <Typography>{firstName} {lastName}</Typography>
                        <Typography>{address}</Typography>
                        <Typography>{city}, {zip}</Typography>
                        <Typography>{countries.find(e => e.code === country)?.name}</Typography>
                        <Typography>{phone}</Typography>
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
                            <Button color="secondary" className="circular-btn" fullWidth>
                                Confirmar orden
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default SummaryPage