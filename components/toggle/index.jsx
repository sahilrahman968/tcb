import { createRef, useEffect, useRef, useState } from "react";
import styles0 from "../../styles/Toggle.module.scss";
import styles1 from "../../styles/Toggle1.module.scss";
import styles2 from "../../styles/Toggle2.module.scss";


const ToggleSwitch = (props) => {
    const { type = 0 } = props;
    const [styles, setStyles] = useState(null)
    useEffect(() => {
        if (type === 0)
            setStyles(styles0);
        else if (type === 1)
            setStyles(styles1);
        else if (type === 2)
            setStyles(styles2);
    }, [type])
    return (styles &&
        <div className={`${styles.wrapper}`} id={`${props.id}`} >
            <div className={`${styles.switch_box}`} >
                <input key={props.id} onChange={props.toggleSwitch} disabled={props.disabled} style={props.checked ? { background: props.backgroundColor } : {}} checked={props.checked} type="checkbox" className={`${styles.switch}`} />
            </div>
        </div>)
}

export default ToggleSwitch;