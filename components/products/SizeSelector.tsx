import type { ISize } from "@/interfaces"
import { Box, Button } from "@mui/material"

interface Props {
  selectedSize?: ISize
  sizes: ISize[]
  changeSize: (size: ISize) => void
}

export const SizeSelector = ({ selectedSize, sizes, changeSize }: Props) => {
  return (
    <Box display="flex" gap={1} sx={{ flexWrap: "wrap" }}>
      {
        sizes.map((size) => (
          <Button
            key={size}
            size="small"
            color={selectedSize === size ? 'secondary' : 'primary'}
            onClick={() => changeSize(size)}
          >
            {size}
          </Button>
        ))
      }
    </Box>
  )
}