import Head from 'next/head'
import ProductCard from 'components/productCard'
import IntroCard from 'components/introCard'
import styles from "../styles/Home.module.scss"
import HorizontalScroller from 'components/horizontalScroller'
// import styles from '../../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={styles.container}>
          <IntroCard />
          <HorizontalScroller>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </HorizontalScroller>
          <HorizontalScroller>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </HorizontalScroller>
          <HorizontalScroller>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </HorizontalScroller>
        </div>
      </main>
    </>
  )
}
