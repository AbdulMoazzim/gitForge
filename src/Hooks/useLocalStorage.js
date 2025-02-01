import { useState, useEffect } from "react";

export function useLocalStorage(initialValue = []) {
    // Load from localStorage or set initial value
    const [sections, setSections] = useState(() => {
        const storedData = localStorage.getItem("data");
        return storedData ? JSON.parse(storedData) : initialValue;
    });

    // Sync with localStorage whenever `sections` changes
    useEffect(() => {
        localStorage.setItem("data", JSON.stringify(sections));
    }, [sections]);

    return [sections, setSections];
}
