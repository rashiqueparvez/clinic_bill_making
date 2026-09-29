const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

/* =========================================
   CORS
========================================= */

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://clinic-bill-making.onrender.com",
];

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin
            // such as Postman or server-to-server requests
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            console.log("CORS blocked:", origin);

            return callback(
                new Error("Not allowed by CORS")
            );
        },

        methods: [
            "GET",
            "POST",
            "PUT",
            "DELETE",
            "PATCH",
            "OPTIONS",
        ],

        allowedHeaders: [
            "Content-Type",
            "Authorization",
        ],

        credentials: true,

        optionsSuccessStatus: 204,
    })
);

/* =========================================
   BODY PARSER
========================================= */

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    })
);

/* =========================================
   ROUTES
========================================= */

app.use(
    "/api/auth",
    require("./routes/auth")
);

/* =========================================
   HEALTH CHECK
========================================= */

app.get("/", (req, res) => {
    res.json({
        success: true,
        message:
            "Clinic Bill Making API is running",
    });
});

/* =========================================
   SERVER
========================================= */

const PORT =
    process.env.PORT || 5000;

app.listen(
    PORT,
    "0.0.0.0",
    () => {
        console.log(
            `Server running on port ${PORT}`
        );
    }
);