// backend/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

// Ensure you have a process.env.JWT_SECRET defined in your .env file
const secret = process.env.JWT_SECRET || 'fallback_secret';

const authMiddleware = async (req, res, next) => {
    try {
        // 1. Check for the Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authentication token missing or invalid.' });
        }

        // 2. Extract the token
        const token = authHeader.split(' ')[1];
        
        // 3. Verify the token
        const isCustomAuth = token.length < 500; // Check if it's your custom token or a Google/other OAuth token

        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, secret);
            
            // 4. Extract the userId (this must match the field name you used when signing the token)
            req.userId = decodedData?.id; 
        } else {
            // Handle OAuth tokens if applicable
            // decodedData = jwt.decode(token);
            // req.userId = decodedData?.sub;
            return res.status(401).json({ message: 'Third-party token handling not implemented yet.' });
        }

        next();
    } catch (error) {
        console.error('Auth Error:', error.message);
        return res.status(401).json({ message: 'Token is invalid or expired.' });
    }
};

export default authMiddleware;