import express from "express";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Loaded Cloudinary config:", {
  name: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY ? "✅ set" : "❌ missing",
  secret: process.env.CLOUDINARY_API_SECRET ? "✅ set" : "❌ missing",
});

// Upload endpoint
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // Ensure user identity (from frontend auth header)
    const userEmail = req.headers["x-user-email"];
    if (!userEmail) {
      return res.status(401).json({ error: "Unauthorized: Missing user identity" });
    }

    const filePath = req.file.path;

    // Determine resource type dynamically
    let resourceType = "image";
    const mime = req.file.mimetype;

    if (
      mime === "application/pdf" ||
      mime.startsWith("text/") ||
      mime.includes("word") ||
      mime.includes("zip") ||
      mime.includes("ms") ||
      mime.includes("spreadsheet")
    ) {
      resourceType = "raw";
    } else if (mime.startsWith("video/")) {
      resourceType = "video";
    }

    // Sanitize filename & add timestamp
    const originalName = req.file.originalname
      .replace(/\//g, "-") // prevent folder nesting
      .replace(/\s+/g, "_") // replace spaces
      .replace(/[^\w.-]/g, ""); // remove illegal characters
    const timestamp = Date.now();
    const fileExt = req.file.originalname.split(".").pop();
    const sanitizedUser = userEmail.replace(/[@.]/g, "_"); // unique folder name per user

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        filePath,
        {
          folder: `drive-clone/${sanitizedUser}`,
          public_id: `${originalName}_${timestamp}`,
          resource_type: resourceType,
          use_filename: true,
          unique_filename: false,
          format: fileExt,
          type: "upload",
          flags: resourceType === "raw" ? "attachment:false" : undefined,
        },
        (error, result) => {
          fs.unlinkSync(filePath); // clean temp file
          if (error) return reject(error);
          resolve(result);
        }
      );
    });

    //  Build metadata
    const fileMeta = {
      name: req.file.originalname,
      url: result.secure_url,
      size: req.file.size,
      type: req.file.mimetype,
      resource_type: result.resource_type,
      format: result.format,
      uploadedAt: new Date(),
      user: userEmail,
    };
    console.log("Incoming file:", req.file);
    console.log(`✅ [${userEmail}] Uploaded to Cloudinary:`, fileMeta);
    res.status(200).json(fileMeta);

  } catch (err) {
    console.error("❌ Upload error:", err);
    res.status(500).json({ error: err.message });
  }
});

//Fetch files — user-specific
app.get("/files", async (req, res) => {
  try {
    const userEmail = req.headers["x-user-email"];
    if (!userEmail) {
      return res.status(401).json({ error: "Unauthorized: Missing user identity" });
    }

    const sanitizedUser = userEmail.replace(/[@.]/g, "_");
    const allResources = [];

    for (const type of ["image", "video", "raw"]) {
      const result = await cloudinary.api.resources({
        type: "upload",
        resource_type: type,
        prefix: `drive-clone/${sanitizedUser}/`,
        max_results: 50,
        context: true,
      });
      allResources.push(...result.resources);
    }

    console.log(`📁 [${userEmail}] fetched ${allResources.length} files`);
    res.json(allResources);
  } catch (err) {
    console.error("❌ Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch user-specific files" });
  }
});

app.post("/invalidate", async (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) {
      return res.status(400).json({ error: "Missing public_id" });
    }

    const result = await cloudinary.api.resource(public_id, { invalidate: true });
    console.log("✅ Invalidated cache for:", public_id);
    res.json({ success: true, result });
  } catch (err) {
    console.error("❌ Cache invalidation failed:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
