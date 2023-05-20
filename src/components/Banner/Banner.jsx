import logo from "../../assets/logo.jpg";
import "./Banner.css";
import banner from "../../assets/banner.jpg";

export default function Banner() {
  return (
    <div id="banner">
      <div>
        <img src={banner} alt="banner rectangulo" id="bannerrectangulo"></img>
      </div>
      <img src={logo} alt="logo" id="bannerlogo"></img>
    </div>
  );
}
