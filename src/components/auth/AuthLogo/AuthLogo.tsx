import styles from "./AuthLogo.module.css";
import logo from "../../../assets/images/ieka_logo.jpg";

const AuthLogo = () => {
  return (
    <div className={styles.logo}>
      <img src={logo} alt="logo" />
    </div>
  );
};

export default AuthLogo;