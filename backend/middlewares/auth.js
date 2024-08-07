const jwt = require('jsonwebtoken');

const ensureAuthentication = (req, res, next) => {
    const auth = req.headers['authorization'];
    
    if (!auth) {
        return res.status(403).json({
            message: 'JWT token is required'
        });
    }
    const token = auth.split(' ')[1];
    
    try {
        // Verify token
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedData;
        next();
    } catch (error) {
        return res.status(403).json({
            message: 'Unauthorized, JWT token is wrong or expired'
        });
    }
};

module.exports = ensureAuthentication;
