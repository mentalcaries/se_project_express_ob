import React,{useEffect} from "react";
export function useEscape(handleClose) {

    const handleEscape = (e) => {

        if (e.key === "Escape") {
            handleClose();
            console.log("welp huston");
        }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
        document.removeEventListener("keydown", handleEscape);
    };
}

export default useEscape