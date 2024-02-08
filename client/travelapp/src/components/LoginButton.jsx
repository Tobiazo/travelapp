

const LoginButton = ({children}) => {

    const handleClick = () => {
        return <></>
    }

    return (
        <button id="loginKnapp" onClick={handleClick}>
            {children}
        </button>
    );
};

export default LoginButton;