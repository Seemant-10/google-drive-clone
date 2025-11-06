import React, { useEffect, useState } from "react";
import '../../styles/fileList.css'
import DeleteIcon from "@mui/icons-material/Delete";

const FileList = ({ reload }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail"); // same key used during login

    if (!userEmail) {
      console.warn("⚠️ No user email found — cannot fetch files.");
      setFiles([]);
      return;
    }

    fetch("http://localhost:5000/files", {
      headers: {
        "x-user-email": userEmail,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched files for user:", userEmail, data);
        setFiles(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Error fetching files:", err));
  }, [reload]);

  // Very simple preview placeholder (icon-like)
  const renderPlaceholder = (file) => {
    const format = file.format ? file.format.toLowerCase() : "";
    // const type = file.resource_type;

    // Image preview
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(format)) {
      return (
        <img className="img_render"
          src={file.secure_url}
          alt={file.original_filename}
        />
      );
    }

    // PDF preview (via Google Docs Viewer)
    if (format === "pdf" || file.secure_url.endsWith(".pdf")) {
      return (
        <iframe 
          className="pdf_render"
          src={file.secure_url + "#view=FitH"}
          title={file.original_filename}
          width="100%"
          height="150px"
        />
      );
    }

    // Fallback: gray box
    return (
      <div className="fallback">
        {format.toUpperCase() || "FILE"}
      </div>
    );
  };


  // Always opens file in new tab
  const handleOpen = (file) => {
    const url = file.secure_url;
    const format = file.format ? file.format.toLowerCase() : "";
    const type = file.resource_type;

    // Image — open directly in new tab
    if (type === "image" || ["jpg", "jpeg", "png", "gif", "webp"].includes(format)) {
      window.open(url, "_blank");
      return;
    }

    // PDF or document — use Google Docs Viewer
    if (["pdf", "doc", "docx"].includes(format)) {
      const viewer = `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
      window.open(viewer, "_blank");
      return;
    }

    // Default fallback
    window.open(url, "_blank");
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 B";
    const units = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const size = bytes / Math.pow(1024, i);
    return `${size.toFixed(1)} ${units[i]}`;
  };

  const formatDateOnly = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return "Unknown";
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDelete = async (file) => {
    const confirmDelete = window.confirm(`Delete ${file.public_id}?`);
    if (!confirmDelete) return;

    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      alert("You must be logged in to delete files.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/delete", {
        method: "POST", // CHANGE to POST for reliability
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          public_id: file.public_id,
          userEmail,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("🗑️ File deleted:", data);
        setFiles((prev) => prev.filter((f) => f.public_id !== file.public_id));
        alert("✅ File deleted successfully!");
      } else {
        console.error("Delete failed:", data);
        alert(`❌ Delete failed: ${data.error}`);
      }
    } catch (error) {
      console.error("Error deleting:", error);
      alert("⚠️ Network error during delete.");
    }
  };


  return (
    <div className="file_main">
      <h3>Uploaded Files</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {files.map((file) => (
          <div
            key={file.asset_id}
            onClick={() => handleOpen(file)}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
              background: "#fafafa",
              cursor: "pointer",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {renderPlaceholder(file)}
            <div style={{ marginTop: "8px" }}>
              <div
                style={{
                  fontWeight: "bold",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                title={file.original_filename || decodeURIComponent(file.public_id.split("/").pop())}  // hover shows full name
              >
                {file.name ||
                  file.original_filename ||
                  decodeURIComponent(file.public_id.split("/").pop())}              
              </div>
              <div style={{
                display: "flex",
                justifyContent: "space-around"
              }}>
                <div style={{ fontSize: "0.8em", color: "#555" }}>
                  {formatFileSize(file.bytes || file.size)}
                </div>

                <div style={{ fontSize: "0.75em", color: "#777" }}>
                  {file.created_at
                    ? formatDateOnly(file.created_at)
                    : file.uploadedAt
                    ? formatDateOnly(file.uploadedAt)
                    : "Unknown"}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "5px",
              }}
            >
              <DeleteIcon
                onClick={(e) => {
                  e.stopPropagation(); // prevent opening file
                  handleDelete(file);
                }}
                style={{
                  cursor: "pointer",
                  color: "#d32f2f",
                  fontSize: "20px",
                  opacity: "0.8",
                }}
                titleAccess="Delete File"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileList;
