import { Slide } from "react-slideshow-image"
import styles from './Slider.module.css'
import 'react-slideshow-image/dist/styles.css'
type Props = {
  images: string[]
}

export const Slider = ({ images }: Props) => {
  return (
    <Slide
      duration={5000}
      easing="ease"
      indicators
    >
      {
        images.map(img => {
          const url = `/products/${img}`
          return (
            <div className={styles['each-slide']} key={img}>
              <div
                style={{
                  backgroundImage: `url(${url})`,
                  backgroundSize: 'cover'
                }}
              >
              </div>
            </div>
          )
        })
      }
    </Slide>
  )
}