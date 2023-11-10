import { createRef, useRef, useState } from "react";
import styles from "../../styles/Toggle.module.scss";

const ToggleSwitch = (props) => {
    return (<div className={`${styles.wrapper}`} id={`${props.id}`} >
        <div className={`${styles.switch_box}`} >
            <input key={props.id} onChange={props.toggleSwitch} disabled={props.disabled} style={props.checked ? {background : props.backgroundColor} : {}} checked={props.checked} type="checkbox" className={`${styles.switch}`} />
        </div>
    </div>)
}

export default ToggleSwitch;