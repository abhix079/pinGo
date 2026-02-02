import { useEffect, useState } from "react";
import style from "../components/HomePage.module.css";
import LeftContainer from "./LeftContainer";

export default function HomePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    const email = params.get("email");
    const picture = params.get("picture");

    if (name && email && picture) {
      const firstName = name.split(" ")[0]; // take first name only
      setUser({ name: firstName, email, picture });
    }
  }, []);

  const handleLogout = () => {
    window.location.href = "http://localhost:8000/auth/logout";
  };

  return (
    <>
      <div className={style.navContainer}>
        <div className={style.logoContainer}>
          <div className={style.dot}></div>
          <div className={style.logoName}>
            pin<span>Go</span>
          </div>
        </div>

        <div className={style.navItems}>
          <p>Home</p>
          <p>About</p>
          <p>Contact Us</p>
        </div>

        {/* ✅ fix: render conditionally */}
        {user ? (
          <div className={style.user}>
            <p>Welcome, {user.name}</p>
            <img src={user.picture} alt="profile" />
            <button onClick={handleLogout} className={style.logoutBtn}>
              Logout
            </button>
          </div>
        ) : (
          <div className={style.user}>
            <p>Welcome, Guest</p>
          </div>
        )}
      </div>

      <div className={style.mainContainer}>
        <div className={style.leftContainer}>
        <LeftContainer/>
        </div>

        <div className={style.rightContainer}>
          <div className={style.rightTop}>top section</div>
          <div className={style.rightBottom}>right bottom</div>
        </div>
      </div>
    </>
  );
}
