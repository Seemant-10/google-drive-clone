import express from "express";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

cloudinary.config({
  cloud_name: "dkbxtssiz",
  api_key: "545121265192261",
  api_secret: "eFDuRpaIiBbqPtiB8WNpFYNr_Uw",
});

// ✅ Upload endpoint
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;

    // ✅ Explicitly detect the correct Cloudinary resource_type
    let resourceType = "image";
    if (
      req.file.mimetype === "application/pdf" ||
      req.file.mimetype.startsWith("text/") ||
      req.file.mimetype.includes("word") ||
      req.file.mimetype.includes("zip")
    ) {
      resourceType = "raw";
    } else if (req.file.mimetype.startsWith("video/")) {
      resourceType = "video";
    }

    // ✅ Upload with correct resource_type
    const originalName = req.file.originalname.split(".")[0]; // remove extension
    const fileExt = req.file.originalname.split(".").pop();

    const result = await new Promise((resolve, reject) => {
      
      cloudinary.uploader.upload(
        filePath,
        {
          folder: "drive-clone",
          public_id: originalName,        // ✅ Force name to stay same
          resource_type: resourceType,
          use_filename: true,
          unique_filename: false,
          format: fileExt,                // ✅ Preserve original format
        },
        (error, result) => {
          fs.unlinkSync(filePath);
          if (error) return reject(error);
          resolve(result);
        }
      );
    });

    const fileMeta = {
      name: req.file.originalname,
      url: result.secure_url,
      size: req.file.size,
      type: req.file.mimetype,
      resource_type: result.resource_type,
      format: result.format,
      uploadedAt: new Date(),
    };

    console.log("✅ Uploaded to Cloudinary:", fileMeta);
    res.status(200).json(fileMeta);
  } catch (err) {
    console.error("❌ Upload error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Fetch files
app.get("/files", async (req, res) => {
  try {
    const allResources = [];

    for (const type of ["image", "video", "raw"]) {
    const result = await cloudinary.api.resources({
        type: "upload",
        resource_type: type,
        prefix: "drive-clone/",
        max_results: 50,
        context: true,
    });
    allResources.push(...result.resources);
    }

    console.log("📁 Files fetched:", allResources.length);
    res.json(allResources);
  } catch (err) {
    console.error("❌ Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch files" });
  }
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
