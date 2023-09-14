import style from "./Footer.module.css"
import { ReactComponent as FIcon } from "../assets/icons/fa-brands_facebook-square.svg";
import { ReactComponent as IIcon } from "../assets/icons/fa-brands_instagram.svg";
import { ReactComponent as TIocn } from "../assets/icons/fa-brands_twitter.svg";
import { ReactComponent as YIcon } from "../assets/icons/fa-brands_youtube.svg";

function Footer() {
  return (
    <footer id={style["site-footer"]}>
      <div>
        <div>
          <span>
            <FIcon/>
          </span>
          <span>
            <IIcon />
          </span>
          <span>
            <TIocn />
          </span>
          <span>
            <YIcon />
          </span>
        </div>
        <div>
          <ul>
            <li>Conditions of Use</li>
            <li>Privacy & Policy</li>
            <li>PressRoom</li>
          </ul>
        </div>
        <div>
          &copy; {new Date().getFullYear()} MovieBox byAdriana Eka Prayudha
        </div>
      </div>
    </footer>
  )
}

export default Footer