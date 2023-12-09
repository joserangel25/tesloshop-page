import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"

interface Props {
  quantity: number
  maxValue?: number
  changeQuantity: (newValue: number) => void
}

export const ItemCounter = ({ quantity, maxValue = 5, changeQuantity }: Props) => {

  const addOrRemove = (value: number) => {
    if (value === -1) {
      if (quantity === 1) return;

      return changeQuantity(quantity - 1);
    }

    if (quantity >= maxValue) return;

    changeQuantity(quantity + 1);
  }
  return (
    <Box display="flex" alignItems="center">
      <IconButton
        onClick={() => addOrRemove(-1)}
      >
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>{quantity}</Typography>
      <IconButton
        onClick={() => addOrRemove(+1)}
      >
        <AddCircleOutline />
      </IconButton>
    </Box>
  )
}