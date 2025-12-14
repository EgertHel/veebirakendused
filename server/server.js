const express = require('express');
const pool = require('./database');
const cors = require('cors')
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 3000;

const app = express();

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));

app.use(express.json());
app.use(cookieParser());

const secret = "fheu218dmkapok2pdl3"; // Secret key for JWT
const maxAge = 60 * 60;
const generateJWT = (id) => {
    return jwt.sign({ id }, secret, { expiresIn: maxAge })
}

// Adds a new post
app.post('/api/posts', async (req, res) => {
    try {
        console.log("A post request has arrived");
        const post = req.body;
        const newpost = await pool.query(
            "INSERT INTO posts(body) values ($1)    RETURNING*", [post.body]
        );
        res.json(newpost);
    } catch (err) {
        console.error(err.message);
    }
});

// Gets all posts
app.get('/api/posts', async (req, res) => {
    try {
        console.log("Get posts request has arrived");
        const posts = await pool.query(
            "SELECT * FROM posts"
        );
        res.json(posts.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Deletes all posts
app.delete('/api/posts', async (req, res) => {
    try {
        console.log("Delete all posts request has arrived");
        const deletepost = await pool.query(
            "DELETE FROM posts"
        );
        res.json(deletepost);
    } catch (err) {
        console.error(err.message);
    }
});

// Gets a specific post by id
app.get('/api/posts/:id', async (req, res) => {
    try {
        console.log("Get a post with route parameter request has arrived");
        const { id } = req.params;
        const posts = await pool.query(
            "SELECT * FROM posts WHERE id = $1", [id]
        );
        if (posts.rows.length === 0) {
            return res.status(404).json({
                error: "Post not found"
            })
        }
        res.json(posts.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Updates a post by id
app.put('/api/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = req.body;
        console.log("Update request has arrived");
        const updatepost = await pool.query(
            "UPDATE posts SET (body, date) = ($2, CURRENT_TIMESTAMP) WHERE id = $1 RETURNING*", [id, post.body]
        );
        res.json(updatepost);
    } catch (err) {
        console.error(err.message);
    }
});

// Deletes a post by id
app.delete('/api/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Delete a post request has arrived");
        const deletepost = await pool.query(
            "DELETE FROM posts WHERE id = $1 RETURNING*", [id]
        );
        res.json(deletepost);
    } catch (err) {
        console.error(err.message);
    }
});

// User signup
app.post('/auth/signup', async (req, res) => {
    try {
        console.log("A signup request has arrived");
        const { email, password } = req.body;

        // Check if user already exists
        const existingUser = await pool.query(
            "SELECT * FROM users WHERE email = $1", [email]
        );
        if (existingUser.rows.length > 0) {
            return res.status(400).send("User already exists");
        }

        const salt = await bcrypt.genSalt();
        const bcryptPassword = await bcrypt.hash(password, salt)

        // Insert new user into database
        const authUser = await pool.query(
            "INSERT INTO users(email, password) values ($1, $2) RETURNING*", [email, bcryptPassword]
        );
        console.log(authUser.rows[0].id);
        const token = await generateJWT(authUser.rows[0].id);
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: authUser.rows[0].id })
            .send;
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

// User login
app.post('/auth/login', async (req, res) => {
    try {
        console.log("A login request has arrived");
        const { email, password } = req.body;

        // Find user by email
        const user = await pool.query(
            "SELECT * FROM users WHERE email = $1", [email]
        );

        if (user.rows.length === 0) {
            return res.status(401).json({ error: "User is not registered" });
        }

        // Compare provided password with hashed password in database
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(401).json({ error: "Incorrect password" });
        }

        const token = await generateJWT(user.rows[0].id);
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: user.rows[0].id })
            .send;
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

// Authenticate user
app.get('/auth/authenticate', async (req, res) => {
    console.log('Authentication request has been arrived');
    // Read JWT from cookie
    const token = req.cookies.jwt;
    let authenticated = false;

    try {
        // Token verification
        if (token) {
            await jwt.verify(token, secret, (err) => {
                if (err) {
                    console.log(err.message);
                    res.send({ "authenticated": authenticated });
                } else {
                    authenticated = true;
                    res.send({ "authenticated": authenticated });
                }
            });
        } else {
            res.send({ "authenticated": authenticated });
        }
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

// User logout - Clears JWT cookie
app.get('/auth/logout', (req, res) => {
    console.log('Delete jwt request arrived');
    res
        .status(202)
        .clearCookie('jwt')
        .json({ "Msg": "Cookie cleared" })
        .send;
});

// Starts the server
app.listen(port, () => {
    console.log("Server started");
    console.log("Server is listening to port " + port);
});