import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ShopLayout } from "../../components/layouts"
import { CartContext } from "../../context";
import { countries } from "../../utils"

type FormData = {
    firstName: string;
    lastName: string;
    address: string;
    zip: string;
    city: string;
    country: string;
    phone: string;
}

const AddressPage = () => {
    const router = useRouter();
    const {updateAddress} = useContext(CartContext);
    const getAddressFromCookie = ():FormData => {
        return {
            firstName: Cookies.get('firstName') || '',
            lastName: Cookies.get('lastName') || '',
            address: Cookies.get('address') || '',
            zip: Cookies.get('zip') || '',
            city: Cookies.get('city') || '',
            country: Cookies.get('country') || '',
            phone: Cookies.get('phone') || ''
        }
    }
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        defaultValues: getAddressFromCookie()
    });
    const onSubmitAddress = (data:FormData) => {
        updateAddress(data)
        router.push('/checkout/summary');
    }
  return (
    <ShopLayout title="Direccion" pageDescription="Confirmar direccion del destino">
        <form onSubmit={handleSubmit(onSubmitAddress)}>
            <Typography variant="h1" component="h1">Direccion</Typography>
            <Grid container spacing={2} marginTop={2}>
                <Grid item xs={12} sm={6}>
                    <TextField 
                    label="Nombre" 
                    variant="filled" 
                    fullWidth
                    {...register('firstName', {
                        required:'Este campo es requerido'
                    })}
                    error = {!!errors.firstName}
                    helperText={errors.firstName?.message}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                    label="Apellido" 
                    variant="filled" 
                    fullWidth
                    {...register('lastName', {
                        required:'Este campo es requerido'
                    })}
                    error = {!!errors.lastName}
                    helperText={errors.lastName?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                    label="Direccion" 
                    variant="filled" 
                    fullWidth
                    {...register('address', {
                        required:'Este campo es requerido'
                    })}
                    error = {!!errors.address}
                    helperText={errors.address?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                    label="Codigo Postal" 
                    variant="filled" 
                    fullWidth
                    {...register('zip', {
                        required:'Este campo es requerido'
                    })}
                    error = {!!errors.zip}
                    helperText={errors.zip?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                    label="Ciudad" 
                    variant="filled" 
                    fullWidth
                    {...register('city', {
                        required:'Este campo es requerido'
                    })}
                    error = {!!errors.city}
                    helperText={errors.city?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <TextField
                            select
                            variant="filled"
                            label="Pais"
                            defaultValue={ Cookies.get('country') || countries[0].code}
                            {...register('country', {
                                required:'Este campo es requerido'
                            })}
                            error = {!!errors.country}
                        >
                            {
                                countries.map(country => (
                                    <MenuItem key={country.code} value={country.code}>
                                        {country.name}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                    label="Telefono" 
                    variant="filled" 
                    fullWidth
                    {...register('phone', {
                        required:'Este campo es requerido'
                    })}
                    error = {!!errors.phone}
                    helperText={errors.phone?.message}
                    />
                </Grid>
            </Grid>
            <Box
                sx={{mt:5, display: 'flex', justifyContent:'center'}}
            >
                <Button type="submit" color="secondary" size="large">
                    Revisar Pedido
                </Button>
            </Box>
        </form>
    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
//VERSION VIEJA DE NEXT
/* 
export const getServerSideProps: GetServerSideProps = async ({req}) => {
    const {token = ''} = req.cookies;
    let userId = '';
    let isValidToken = false;

    try{
        userId = await jwt.isValidToken(token);
        isValidToken = true;
    }catch(err){
        isValidToken = false;
    }

    if(!isValidToken){
        return {
            redirect:{
                destination: '/auth/login?p=/checkout/address',
                permanent: false,
            }
        }
    }

    return {
        props: {
            
        }
    }
}
 */

export default AddressPage