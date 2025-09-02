import { Pool } from 'pg';
import jwt from 'jsonwebtoken';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Verify JWT token
        const token = req.headers.authorization?.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const walletAddress = decoded.wallet;

        const { username, displayName, bio, socialLinks } = req.body;

        // Insert or update artist
        const query = `
            INSERT INTO artists (wallet_address, username, display_name, bio, social_links)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (wallet_address)
            DO UPDATE SET 
                username = $2,
                display_name = $3,
                bio = $4,
                social_links = $5,
                updated_at = CURRENT_TIMESTAMP
            RETURNING *
        `;

        const result = await pool.query(query, [
            walletAddress,
            username,
            displayName,
            bio,
            JSON.stringify(socialLinks || {})
        ]);

        res.json({ success: true, artist: result.rows[0] });

    } catch (error) {
        if (error.constraint === 'artists_username_key') {
            return res.status(400).json({ error: 'Username already taken' });
        }
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
}