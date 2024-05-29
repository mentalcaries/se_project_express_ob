import React,{useEffect} from "react";
export function useEscape(handleClose) {

        useEffect(() => {
            const handleEscape = (e) => {
                if (e.key === "Escape") {
                    handleClose();
                    console.log("Escape key pressed");
                }
            };
    
            document.addEventListener("keydown", handleEscape);
    
            return () => {
                document.removeEventListener("keydown", handleEscape);
            };
        }, [handleClose]);
}

export default useEscape