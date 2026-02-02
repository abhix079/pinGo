import axios from "axios";
import qs from "qs";


// Step 1: Redirect user to Google login
export const login = (req, res) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&scope=openid%20email%20profile`;
  res.redirect(url);
};

// Step 2: Handle Google callback
export const callback = async (req, res) => {
  const code = req.query.code;

  try {
    // Exchange code for tokens
    const response = await axios.post(
      "https://oauth2.googleapis.com/token",
      qs.stringify({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: "authorization_code",
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { access_token } = response.data;

    // Get user info 
    const googleUser = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    
    const { name, email, picture } = googleUser.data;

    // Redirect to frontend with user info after login
    res.redirect(
      `http://localhost:5173/homepage?name=${encodeURIComponent(name)}&email=${encodeURIComponent(
        email
      )}&picture=${encodeURIComponent(picture)}`
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Error during authentication");
  }
};

// Step 3: Logout code 
export const logout = (req, res) => {
  res.clearCookie("token"); // clear cookie if using JWT
  res.redirect("http://localhost:5173/"); // back to landing page
};
