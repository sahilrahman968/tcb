import React, { useEffect, useState } from 'react'
import styles from '../../styles/Input.module.scss'
import Image from 'next/image'
import search from "../../assets/search.png"
const Input = () => {
  const items = ['Duck Curry', 'Masor Tenga', 'Tiramisu', 'Chocolate Chip Cookies']; // Replace with your array of items
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 1500);
    return () => clearInterval(intervalId);
  }, [items.length]);

  const currentSearchItem = items[currentIndex];
  return (
    <>
    <div className={styles.input_container}>
        Search for {currentSearchItem}
        <Image src={search} alt="clear search" width={14} height={14}/>
    </div>
    <div>
      <Image/>
    </div>
    </>
  )
}

export default Input