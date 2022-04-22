import { Chip, Grid, Link, Typography } from "@mui/material"
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid"
import NextLink from "next/link";

import { ShopLayout } from "../../components/layouts"

const row = [
    {id:1, paid:true, fullname:'Lorenzo Tomas Diez'},
    {id:2, paid:false, fullname:'Nilda Nancy Diez'},
    {id:3, paid:true, fullname:'Lucinda Diez'},
    {id:4, paid:true, fullname:'Lolita Diez'}
]; 
const columns:GridColDef[ ]  = [
    {field:'id', headerName:'ID', width: 100},
    {field:'fullname', headerName:'Nombre', width: 300},
    {
        field:'paid', 
        headerName:'Paid', 
        description: 'Info if is paid or not', 
        width:200,
        renderCell:(params: GridValueGetterParams) => {
             return(
                 params.row.paid
                    ? <Chip color="success" label="Pagada" variant="outlined" />
                    : <Chip color="error" label="No Pagada" variant="outlined" />
             )
        }
    },
    {
        field:'orden', 
        headerName:'Link to', 
        description: 'Ver orden', 
        width:200,
        sortable: false,
        renderCell:(params: GridValueGetterParams) => {
             return(
                 <NextLink href={`/orders/${params.row.id}`} passHref>
                    <Link>
                        Ver orden
                    </Link>
                 </NextLink>
             )
        }
    }, 
];


const HistoryPage = () => {
  return (
    <ShopLayout title={"Historial de ordenes"} pageDescription={"Historial de ordenes "}>
        <Typography variant="h1" component="h1">Historial de ordenes</Typography>
         <Grid container>
             <Grid item xs={12} sx={{height:650, width: '100%'} }>
                <DataGrid 
                    columns={columns} 
                    rows={row}
                    pageSize={10}
                    rowsPerPageOptions={[10 ]}
                />
             </Grid>
         </Grid>
    </ShopLayout>
  )
}

export default HistoryPage