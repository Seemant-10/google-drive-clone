import React, { useState } from "react";
import "../../styles/NewFile.css";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import { Box, Button, Typography } from "@mui/material";

const NewFile = ({ onUploadSuccess }) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setMessage("");
    setFile(null);
  };

  const handleChange = (e) => setFile(e.target.files[0]);

    const handleUpload = async () => {
    if (!file) {
      setMessage("⚠️ Please select a file first.");
      return;
    }

    // ✅ Basic file validation
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/zip",
    ];
    if (!allowedTypes.includes(file.type)) {
      setMessage("❌ Unsupported file type.");
      return;
    }

    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    const userEmail = localStorage.getItem("userEmail");
    console.log("📤 Upload initiated for:", userEmail, "file:", file.name);

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        headers: {
          "x-user-email": userEmail || "",
          Accept: "application/json",
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        console.log("✅ Uploaded successfully:", data);
        setMessage("✅ Upload successful!");
        if (onUploadSuccess) onUploadSuccess();
        setTimeout(() => setOpen(false), 1200);
      } else {
        console.error("❌ Upload failed:", data.error || data);
        setMessage(`❌ Upload failed: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("⚠️ Upload error:", error);
      setMessage("⚠️ Network or server error.");
    } finally {
      setUploading(false);
    }
  };


  return (
    <div className="newFile">
      <div className="newFile_container" onClick={handleOpen}>
        <AddIcon />
        <p>New</p>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 420,
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: 24,
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Upload a File
          </Typography>
          {file && (
            <Typography sx={{ fontSize: "0.8em", mt: 1, color: "#555" }}>
              Selected: {file.name}
            </Typography>
          )}
          {uploading ? (
            <Typography color="primary" sx={{ mt: 2 }}>
              Uploading...
            </Typography>
          ) : (
            <>
              <input
                type="file"
                onChange={handleChange}
                style={{
                  display: "block",
                  margin: "10px auto",
                  border: "1px solid #ddd",
                  padding: "10px",
                  borderRadius: "6px",
                }}
              />
              <Button
                variant="contained"
                onClick={handleUpload}
                sx={{ mt: 2, width: "100%" }}
              >
                Upload
              </Button>
            </>
          )}

          {message && (
            <Typography
              sx={{
                mt: 2,
                color: message.includes("✅") ? "green" : "red",
                fontWeight: 500,
              }}
            >
              {message}
            </Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default NewFile;
