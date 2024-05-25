
import { useEffect } from "react";
export function useEscape(closeModal, handleClose) {
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") {
                handleClose();
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [closeModal]);
}

export default useEscape