import { Box, Typography } from "@mui/material"
import { ShopLayout } from "../components/layouts"

const Custom404 = () => {
  return (
    <ShopLayout title="Page not found" pageDescription="Nothing to show here">
        <Box
            sx={{
                display:'flex',
                flexDirection:{xs:'column', sm:'row'},
                justifyContent:'center', 
                alignItems:'center',
                height:'calc(100vh - 200px)'
            }}
        >
            <Typography
                variant='h1' 
                component='h1' 
                fontSize={40}
                fontWeight={200}
            >
                404 |
            </Typography>
            <Typography
                fontWeight={500}
                marginLeft={2}
            >
                Maybe page doesn&apos;t exist anymore
            </Typography>
        </Box>
    </ShopLayout>
  )
}

export default Custom404