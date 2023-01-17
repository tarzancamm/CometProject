import React from 'react'
import {Carousel} from 'react-responsive-carousel'

import styles from './HeroCarousel.module.css'

const HeroCarousel = () => {
  return (
    <Carousel>
        <div className={styles.carousel}>
        </div>
        <div className={styles.carousel}>
        </div>
        <div className={styles.carousel}>
        </div>
    </Carousel>
  )
}

export default HeroCarousel