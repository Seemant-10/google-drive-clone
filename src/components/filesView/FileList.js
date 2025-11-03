import React, { useEffect, useState } from "react";

const FileList = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/files")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched files:", data);
        setFiles(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Error fetching files:", err));
  }, []);

  // Very simple preview placeholder (icon-like)
  const renderPlaceholder = (file) => {
    const format = file.format ? file.format.toLowerCase() : "";
    const type = file.resource_type;

    // 🖼️ Image preview
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(format)) {
      return (
        <img
          src={file.secure_url}
          alt={file.original_filename}
          style={{
            width: "100%",
            height: "150px",
            objectFit: "cover",
            borderRadius: "6px",
          }}
        />
      );
    }

    // 📄 PDF preview (via Google Docs Viewer)
    if (format === "pdf" || file.secure_url.endsWith(".pdf")) {
      return (
        <iframe
          src={file.secure_url + "#view=FitH"}
          title={file.original_filename}
          width="100%"
          height="150px"
          style={{
            border: "1px solid #ccc",
            borderRadius: "6px",
            pointerEvents: "none", // 🔒 makes it unscrollable/unselectable
          }}
        />
      );
    }

    // 🎥 Video preview (optional)
    if (type === "video") {
      return (
        <video
          src={file.secure_url}
          controls
          style={{ width: "100%", height: "150px", borderRadius: "6px" }}
        />
      );
    }

    // 📦 Fallback: gray box
    return (
      <div
        style={{
          width: "100%",
          height: "150px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f0f0f0",
          borderRadius: "6px",
          fontSize: "14px",
          color: "#777",
        }}
      >
        {format.toUpperCase() || "FILE"}
      </div>
    );
  };


  // ✅ Always opens file in new tab
  const handleOpen = (file) => {
    // always open the secure_url returned by Cloudinary
    // this works if Cloudinary account allows PDF delivery
    window.open(file.secure_url, "_blank");
  };

  return (
    <div style={{ padding: "20px" }}>
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
              <div style={{ fontSize: "0.8em", color: "#555" }}>
                {(file.bytes / 1024).toFixed(1)} KB
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileList;
