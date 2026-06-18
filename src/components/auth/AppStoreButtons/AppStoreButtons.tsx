import playStore from "../../../assets/images/gogoleplaystore.png";
import appStore from "../../../assets/images/iosplaystore.png";

import "./AppStoreButtons.css";

const AppStoreButtons = () => {
  return (
    <div className="app-download">
      <button className="app-btn">
        <img src={playStore} alt="Get it on Google Play" />
      </button>
      <button className="app-btn">
        <img src={appStore} alt="Download on the App Store" />
      </button>
    </div>
  );
};

export default AppStoreButtons;
