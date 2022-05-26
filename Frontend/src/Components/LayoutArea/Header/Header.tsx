import Logo from "../Logo/Logo";
import Menu from "../Menu/Menu";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
            <h1> 💖Follow Vacation💕</h1>
            <Logo />
            <Menu />
        </div>
    );
}

export default Header;