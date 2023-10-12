// import React from reactProductionProfiling;
import styles from "../../styles/VegNonVeg.module.scss"

// const VegNonVeg = ({type}) => {
//     return <div className={styles.veg_non_veg_container} style={{border:`1px solid ${type==="veg" ? "green":"red"}`}}>
//       <div className={styles.marker} style={{backgroundColor:type==="veg" ? "green":"red"}}></div>
//     </div>
// }


// export default VegNonVeg

import React from 'react'

const VegNonVeg = ({type}) => {
    return (
        <div className={styles.veg_non_veg_container} style={{ border: `1px solid ${type === "veg" ? "green" : "red"}` }}>
            <div className={styles.marker} style={{ backgroundColor: type === "veg" ? "green" : "red" }}></div>
        </div>
    )
}

export default VegNonVeg