const router = require("express").Router();
const passport = require("passport");
const cors = require("cors");  // Add this line
const authenticateGoogleToken = require('../middleware/authGoogleToken');

// Use CORS middleware
router.use(cors()); 


router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Logged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
	'/google/callback',
	passport.authenticate('google', {
	  failureRedirect: '/login/failed',
	  successRedirect: 'http://localhost:5173/employDash', // Use the absolute URL here
	})
  );

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

// Add a new route to fetch user profile data
router.get("/api/users/profile", authenticateGoogleToken, (req, res) => {
	try {
	  // Assuming you have a user object attached to the request
	  if (req.user) {
		// Send user data as a response
		res.status(200).json({
		  googleUserId: req.user.googleUserId,
		  // Include other user properties as needed
		});
	  } else {
		res.status(401).json({ error: true, message: "Not Authenticated" });
	  }
	} catch (error) {
	  console.error('Error fetching user profile:', error);
	  res.status(500).json({ error: true, message: "Internal Server Error" });
	}
  });
  
  module.exports = router;
  