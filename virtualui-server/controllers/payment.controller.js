import User from '../models/user.models.js';
export const addCredits = async (req, res) => {
  try {
    const { aiCredits } = req.body;

    // Basic validation - refuse to touch the DB with garbage input
    if (aiCredits === undefined || typeof aiCredits !== 'number' || aiCredits <= 0) {
      return res.status(400).json({
        success: false,
        message: 'aiCredits must be a positive number.',
      });
    }

    // Atomic increment - no read-then-write race condition
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { $inc: { aiCredits } },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Credits added successfully!',
      user: updatedUser,
    });
  } catch (error) {
    console.error('addCredits error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while adding credits.',
    });
  }
};