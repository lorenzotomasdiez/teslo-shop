import { Box, Button } from "@mui/material";
import { FC } from "react"
import { ISize } from "../../interfaces";

interface Props{
    selectedSize?: ISize;
    sizes: ISize[];

    //methods
    onSelectedSize: (size:ISize) => void;
}
export const SizeSelector:FC<Props> = ({selectedSize, sizes, onSelectedSize}) => {
  return (
    <Box sx={{display:'flex', justifyContent: 'space-around', flexWrap:'wrap'}}>
        {
            sizes.map(size => (
                <Button
                    key={size}
                    size='small'
                    color={selectedSize === size ? 'primary' : 'info'}
                    onClick={()=> onSelectedSize(size)}
                >
                    {size}
                </Button>
            ))
        }
    </Box>
  )
}
