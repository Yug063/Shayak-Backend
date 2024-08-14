const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController'); 
const { auth } = require("../middlewares/authMiddleware"); 

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.get('/auth-status', auth, (req, res) => { 
    res.status(200).json({
      authenticated: true, 
      user: req.user 
    });
  });

router.post('/logout', auth, (req, res) => {
    res.cookie('token', '', { 
      expires: new Date(0), 
      httpOnly: true, 

    });
    res.status(200).json({ message: 'Logged out successfully' });
  });

module.exports = router;