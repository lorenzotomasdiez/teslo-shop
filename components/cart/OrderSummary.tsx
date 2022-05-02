import { Grid, Typography } from "@mui/material"
import { useContext } from "react"
import { CartContext } from "../../context"
import { currency } from "../../utils"

export const OrderSummary = () => {
  const {numberOfItems, subTotal, total, tax} = useContext(CartContext)
  return (
    <Grid container>
        {/* cant productos */}
        <Grid item xs={6}>
            <Typography>No. Productos</Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="end">
            <Typography>{currency.format(numberOfItems)}</Typography>
        </Grid>
        
        {/* subtotal */}
        <Grid item xs={6}>
            <Typography>Subtotal</Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="end">
            <Typography>{currency.format(subTotal)}</Typography>
        </Grid>
        
        {/* impuestos */}
        <Grid item xs={6}>
            <Typography>Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE || 0) * 100}%)</Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="end">
            <Typography>{currency.format(tax)}</Typography>
        </Grid>

        {/* total */}
        <Grid item xs={6} sx={{mt:2}}>
            <Typography>Total</Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="end" sx={{mt:2}}>
            <Typography>{currency.format(total)}</Typography>
        </Grid>
    </Grid>
  )
}
