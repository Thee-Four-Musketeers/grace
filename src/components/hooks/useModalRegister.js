import { useState } from 'react';

const useModalRegister = () => {
    const [isShowing, setIsShowing] = useState(false);

    function toggleRegister() {
        setIsShowing(!isShowing);
    }

    return {
        isShowing,
        toggleRegister,
    }
};

export default useModalRegister;
