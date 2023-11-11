import React, { useState } from 'react'
import styles from "../../styles/AddressSelector.module.scss"
const AddressSelector = () => {
    const addresses = [
        {
            name: "Sahil",
            locality: "Sikanderpur",
            landmark: "Mittal Timber Trader",
            house_no: "H-36/27",
            pin: "1122002",
            ph: "8876634108",
        },
        {
            name: "Rohit",
            locality: "Sikanderpur",
            landmark: "Mittal Timber Trader",
            house_no: "H-36/27",
            pin: "1122002",
            ph: "8876634108",
        },
        {
            name: "Ravi",
            locality: "Sikanderpur",
            landmark: "Mittal Timber Trader",
            house_no: "H-36/27",
            pin: "1122002",
            ph: "8876634108",
        },
        {
            name: "Abhinav",
            locality: "Sikanderpur",
            landmark: "Mittal Timber Trader",
            house_no: "H-36/27",
            pin: "1122002",
            ph: "8876634108",
        },
        {
            name: "Anshuman",
            locality: "Sikanderpur",
            landmark: "Mittal Timber Trader",
            house_no: "H-36/27",
            pin: "1122002",
            ph: "8876634108",
        }
    ]
    const [selected, setSelected] = useState(null);
    return (
        <div className={styles.container}>
            {
                addresses?.length === 0 ?
                    <div className={styles.add_new}>Add New</div> :
                    <div className={styles.list}>
                        {
                            addresses?.map((item, index) => {
                                return <div
                                    key={index}
                                    className={styles.item_container}
                                    onClick={() => { setSelected(index) }}
                                    style={{ border: selected === index ? "2px dashed #ddd" : "" }}
                                >
                                    <div className={styles.item_heading}>{item?.name}</div>
                                    <div className={styles.item_detail}>
                                        {
                                            item?.locality?.length > 0 && <span>{item?.locality + " | "}</span>
                                        }
                                        {
                                            item?.landmark?.length > 0 && <span>{item?.landmark + " | "}</span>
                                        }
                                        {
                                            item?.house_no?.length > 0 && <span>{item?.house_no + " | "}</span>
                                        }
                                        {
                                            item?.pin?.length > 0 && <span>{item?.pin + " | "}</span>
                                        }
                                        {
                                            item?.ph?.length > 0 && <span>{item?.ph}</span>
                                        }
                                    </div>
                                </div>
                            })
                        }
                    </div>
            }
        </div>
    )
}

export default AddressSelector