import { useState } from "react";

export const useSelectedOption = () => {
    const [selectedOption, setSelectedOption] = useState<"muertes" | "crasheos">("muertes");

    const selectOption = (option: "muertes" | "crasheos") => {
        setSelectedOption(option);
    };

    return { selectedOption, selectOption };
};
