import User from '../models/user.models.js';

// Must run AFTER isAuth (needs req.userId already set)
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    if (user.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admins only.',
      });
    }

    next();
  } catch (error) {
    console.error('isAdmin Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while checking admin access.',
    });
  }
};

export default isAdmin;