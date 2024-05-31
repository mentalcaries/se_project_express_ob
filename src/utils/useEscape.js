import { useEffect } from "react";

export default function useEscape(closeModal, closePopup) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closePopup();
        console.log("escape button clicked")
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [closeModal]);
}