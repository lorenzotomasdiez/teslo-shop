import { Grid, Typography } from "@mui/material"

export const OrderSummary = () => {
  return (
    <Grid container>
        {/* cant productos */}
        <Grid item xs={6}>
            <Typography>No. Productos</Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="end">
            <Typography>3</Typography>
        </Grid>
        
        {/* subtotal */}
        <Grid item xs={6}>
            <Typography>Subtotal</Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="end">
            <Typography>$155</Typography>
        </Grid>
        
        {/* impuestos */}
        <Grid item xs={6}>
            <Typography>Impuestos (15%)</Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="end">
            <Typography>$35.34</Typography>
        </Grid>

        {/* total */}
        <Grid item xs={6} sx={{mt:2}}>
            <Typography>Total</Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="end" sx={{mt:2}}>
            <Typography>$186.43</Typography>
        </Grid>
    </Grid>
  )
}
