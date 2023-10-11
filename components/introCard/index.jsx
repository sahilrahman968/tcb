import React from 'react'
import styles from "../../styles/IntroCard.module.scss"
import biryani from "../../assets/biryani.jpeg"
import Image from 'next/image'

const IntroCard = () => {
    return (
        <div className={styles.container}>
            <div className={styles.image_container}>
                <Image className={styles.image} src={biryani} />
            </div>
            <div className={styles.info_container}>
                <div className={styles.card_title}>
                    Bailey's Irish Cream
                </div>
                <div className={styles.card_subtitle}>
                    Bailey's Irish Cream, a luscious elixir, dances on your palate. Creamy, velvety, and kissed with the enchanting essence of Irish whiskey, it's a seductive symphony of flavors that sends your taste buds on a heavenly journey, leaving you craving another indulgent sip.
                </div>
            </div>
        </div>
    )
}

export default IntroCard