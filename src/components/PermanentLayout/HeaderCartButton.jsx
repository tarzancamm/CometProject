import React from 'react'

import CartIcon from '../Cart/CartIcon'
import styles from './HeaderCartButton.module.css'

const HeaderCartButton = () => {
    return (
        <button className={styles.cartbtn}>
            <span className={styles.icon}>
                <CartIcon />
            </span>
            <span>Dynamic #Items</span>
        </button>
    )
}

export default HeaderCartButton