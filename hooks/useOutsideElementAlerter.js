import { useEffect } from "react";

const useOutsideElementAlerter = (ref, setShow, excludeId) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target) && event.target.id !== excludeId) {
                setShow(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

export default useOutsideElementAlerter