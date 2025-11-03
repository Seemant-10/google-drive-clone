import React, { useState } from "react";
import "../../styles/NewFile.css";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import { Box, Button, Typography } from "@mui/material";

const NewFile = () => {
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

    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
    // optional metadata
    formData.append("context", `file_name=${file.name}|file_type=${file.type}`);

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        console.log("✅ Uploaded:", data);
        setMessage("✅ Upload successful!");
        setTimeout(() => setOpen(false), 1500);
      } else {
        console.error("Upload failed:", data);
        setMessage("❌ Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading:", error);
      setMessage("⚠️ Error during upload.");
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
