import style from "./LandingPage.module.css";
import { FcGoogle } from "react-icons/fc";

export default function LandingPage({ loginWithGoogle }) {
  return (
    <div className={style.mainContainer}>
      <div className={style.logoContainer}>
        <div className={style.dot}></div>
        <div className={style.logoName}>
          pin<span>Go</span>
        </div>
      </div>

      <div className={style.headingContainer}>
        <div className={style.heading}>
          Let's ping your Backend<span>.</span>
        </div>
        <div className={style.subHeading}>Sign in to start pinging your backend</div>
      </div>

      <div className={style.loginContainer}>
        <FcGoogle size={20} />
        <button onClick={loginWithGoogle}>Continue with Google</button>
      </div>
      <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
    </div>
  );
}
