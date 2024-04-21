import "./styles.css";
import { useNavigate } from "react-router-dom";
const Logo: string = require("../../assets/logo.svg").default;
const ArrowBack: string = require("../../assets/arrow-back.svg").default;

type Props = {
  showBack?: boolean;
};

function Header({ showBack }: Props) {
  const navigate = useNavigate();
  return (
    <header className="header">
      {showBack && (
        <img
          src={ArrowBack}
          alt="arrow back"
          className="arrow-back"
          onClick={() => navigate(-1)}
        />
      )}
      <img src={Logo} alt="Logo" />
    </header>
  );
}

export default Header;
