import React from 'react'
import ShimmerCard1 from './ShimmerCard1'
import ShimmerCard2 from './ShimmerCard2'

const ShimmerCard = ({type=1}) => {
  switch(type){
    case 1: return <ShimmerCard1/>
    case 2: return <ShimmerCard2/>
  }
}

export default ShimmerCard