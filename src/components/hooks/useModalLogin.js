import { useState } from 'react';


const useModalLogin = () => {
    const [show, setShow] = useState(false);

    function toggle() {
        setShow(!show);
    }

    return {
        show,
        toggle,
    }
};

export default useModalLogin;
