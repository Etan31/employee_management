const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const { verifyToken } = require("./middlewares/authMiddleware");
const seedAdmin = require("./utils/seedAdmin");

const { verifyAdmin } = require("./middlewares/verifyAdmin.js");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Run admin seed before the server starts
seedAdmin().then(() => {
  console.log("🔑 Admin seed check completed.");

  // Public routes
  app.use("/", authRoutes);

  // Protected routes
  app.get("/dashboard", verifyToken, (req, res) => {
    res.json({ message: "Welcome to Dashboard", user: req.user });
  });

  app.get("/usermanagement", verifyToken, (req, res) => {
    res.json({ message: "User Management Access", user: req.user });
  });

  app.get("/events", verifyToken, (req, res) => {
    res.json({ message: "events Access", user: req.user });
  });

  app.get("/notification", verifyToken, (req, res) => {
    res.json({ message: "notification Access", user: req.user });
  });

  app.get("/accesscontrol", verifyToken, verifyAdmin, (req, res) => {
    res.json({ message: "accesscontrol Access", user: req.user });
  });

  app.get("/support", verifyToken, (req, res) => {
    res.json({ message: "support Access", user: req.user });
  });

  app.get("/settings", verifyToken, (req, res) => {
    res.json({ message: "Settings Access", user: req.user });
  });

  // app.get("/api/cities", async (req, res) => {
  //   const { namePrefix } = req.query;
  //   console.log("Received request for cities with prefix:", namePrefix);

  //   try {
  //     // Fetch all cities from PSGC API
  //     const response = await axios.get("https://psgc.gitlab.io/api/cities");
  //     console.log("Fetched cities data");

  //     // Filter cities based on the search prefix
  //     let cities = response.data;

  //     if (namePrefix) {
  //       cities = cities.filter((city) =>
  //         city.name.toLowerCase().startsWith(namePrefix.toLowerCase())
  //       );
  //     }

  //     // Limit results to 10 for better performance
  //     cities = cities.slice(0, 10);

  //     // Transform the data to match our expected format
  //     const formattedData = cities.map((city) => ({
  //       id: city.code,
  //       name: city.name,
  //       province: city.province?.name || "Independent City",
  //       region: city.region?.name || city.regionName || "Unknown Region",
  //     }));

  //     console.log(`Found ${formattedData.length} matching cities`);
  //     res.json(formattedData);
  //   } catch (err) {
  //     console.error("Error fetching cities:", err.message);
  //     if (err.response) {
  //       console.error("API Response Error:", {
  //         status: err.response.status,
  //         statusText: err.response.statusText,
  //         data: err.response.data,
  //       });
  //     }
  //     res.status(500).json({
  //       error: "Failed to fetch cities",
  //       message: err.message,
  //     });
  //   }
  // });

  // app.get("/api/municipalities", async (req, res) => {
  //   const { namePrefix } = req.query;
  //   console.log("Received request for municipalities with prefix:", namePrefix);

  //   try {
  //     // Fetch all municipalities from PSGC API
  //     const response = await axios.get(
  //       "https://psgc.gitlab.io/api/municipalities"
  //     );
  //     console.log("Fetched municipalities data");

  //     // Filter municipalities based on the search prefix
  //     let municipalities = response.data;

  //     if (namePrefix) {
  //       municipalities = municipalities.filter((mun) =>
  //         mun.name.toLowerCase().startsWith(namePrefix.toLowerCase())
  //       );
  //     }

  //     // Limit results to 10 for better performance
  //     municipalities = municipalities.slice(0, 10);

  //     // Transform the data to match our expected format
  //     const formattedData = municipalities.map((mun) => ({
  //       id: mun.code,
  //       name: mun.name,
  //       province: mun.province?.name || "Unknown Province",
  //       region: mun.region?.name || "Unknown Region",
  //     }));

  //     console.log(`Found ${formattedData.length} matching municipalities`);
  //     res.json(formattedData);
  //   } catch (err) {
  //     console.error("Error fetching municipalities:", err.message);
  //     if (err.response) {
  //       console.error("API Response Error:", {
  //         status: err.response.status,
  //         statusText: err.response.statusText,
  //         data: err.response.data,
  //       });
  //     }
  //     res.status(500).json({
  //       error: "Failed to fetch municipalities",
  //       message: err.message,
  //     });
  //   }
  // });

  // app.get("/api/cities", async (req, res) => {
  //   const { namePrefix } = req.query;
  //   console.log("Received request for cities with prefix:", namePrefix);

  //   if (!process.env.RAPIDAPI_KEY) {
  //     console.error("RAPIDAPI_KEY is not set in environment variables");
  //     return res.status(500).json({ error: "API key not configured" });
  //   }

  //   try {
  //     console.log("Making request to RapidAPI...");
  //     console.log("API Key present:", !!process.env.RAPIDAPI_KEY);
  //     console.log("Search prefix:", namePrefix);

  //     const requestConfig = {
  //       method: "get",
  //       url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
  //       params: {
  //         namePrefix,
  //         limit: 5,
  //       },
  //       path: "/v1/geo/cities",
  //       headers: {
  //         "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
  //         "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  //       },
  //     };

  //     console.log("Request configuration:", {
  //       url: requestConfig.url,
  //       params: requestConfig.params,
  //       headers: {
  //         ...requestConfig.headers,
  //         "X-RapidAPI-Key": process.env.RAPIDAPI_KEY
  //           ? "(Key present)"
  //           : "(Key missing)",
  //       },
  //     });

  //     const response = await axios(requestConfig);

  //     console.log("Raw API response:", response.data);
  //     // Ensure we're sending an array of cities
  //     const cities = Array.isArray(response.data.data)
  //       ? response.data.data
  //       : [];
  //     console.log("Processed cities array:", cities);
  //     console.log("Number of cities found:", cities.length);

  //     res.json(cities);
  //   } catch (err) {
  //     console.error("Error fetching cities:", err.message);

  //     if (err.response) {
  //       // The request was made and the server responded with a status code
  //       // that falls out of the range of 2xx
  //       console.error("API Response Error:", {
  //         status: err.response.status,
  //         statusText: err.response.statusText,
  //         data: err.response.data,
  //         headers: err.response.headers,
  //       });
  //       res.status(err.response.status).json({
  //         error: "API Error",
  //         message: err.response.data?.message || err.message,
  //         status: err.response.status,
  //       });
  //     } else if (err.request) {
  //       // The request was made but no response was received
  //       console.error("No response received:", err.request);
  //       res.status(500).json({
  //         error: "No response from API",
  //         message: "The request was made but no response was received",
  //       });
  //     } else {
  //       // Something happened in setting up the request that triggered an Error
  //       console.error("Request setup error:", err.message);
  //       res.status(500).json({
  //         error: "Request Error",
  //         message: err.message,
  //       });
  //     }
  //   }
  // });

  app.get("/api/cities", async (req, res) => {
    const { namePrefix } = req.query;

    try {
      const response = await axios.get("https://psgc.gitlab.io/api/cities");
      let cities = response.data;

      if (namePrefix) {
        const query = namePrefix.toLowerCase();
        cities = cities.filter((city) =>
          city.name.toLowerCase().includes(query)
        );
      }

      // Show all if no prefix; otherwise limit to 10
      if (namePrefix) cities = cities.slice(0, 10);

      const formattedData = cities.map((city) => ({
        id: city.code,
        name: city.name,
        province: city.province?.name || "Unknown Province",
        region: city.region?.name || "Unknown Region",
      }));

      res.json(formattedData);
    } catch (err) {
      console.error("Error fetching cities:", err.message);
      res.status(500).json({ error: "Failed to fetch cities" });
    }
  });

  app.get("/api/municipalities", async (req, res) => {
    const { namePrefix } = req.query;

    try {
      const response = await axios.get(
        "https://psgc.gitlab.io/api/municipalities"
      );
      let municipalities = response.data;

      if (namePrefix) {
        const query = namePrefix.toLowerCase();
        municipalities = municipalities.filter((mun) =>
          mun.name.toLowerCase().includes(query)
        );
      }

      if (namePrefix) municipalities = municipalities.slice(0, 10);

      const formattedData = municipalities.map((mun) => ({
        id: mun.code,
        name: mun.name,
        province: mun.province?.name || "Unknown Province",
        region: mun.region?.name || "Unknown Region",
      }));

      res.json(formattedData);
    } catch (err) {
      console.error("Error fetching municipalities:", err.message);
      res.status(500).json({ error: "Failed to fetch municipalities" });
    }
  });

  app.post("/logout", (req, res) => {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    res.json({ message: "Logged out successfully" });
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
