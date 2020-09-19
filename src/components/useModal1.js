import { useState } from 'react';

const useModal1 = () => {
    const [isShowing, setIsShowing] = useState(false);

    function toggle1() {
        setIsShowing(!isShowing);
    }

    return {
        isShowing,
        toggle1,
    }
};

export default useModal1;
