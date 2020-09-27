import { useState } from 'react';

const useModalLogin = () => {
    const [show, setShow] = useState(false);

    function toggleLogin() {
        setShow(!show);
    }

    return {
        show,
        toggleLogin,
    }
};

export default useModalLogin;
