🧭 Google Drive Clone (Full-Stack)

A full-stack Google Drive Clone built using React, Node.js (Express), Firebase Authentication, and Cloudinary for secure file storage, preview, and management.
It supports multi-user accounts, Google sign-in, upload, view, and delete files, and user-specific file segregation — all in a sleek, responsive UI.

🚀 Features

✅ Google Authentication

Sign in securely with your Google account via Firebase.                                                                                                                                                            
Displays user profile photo, name, and email in the header.	                                                                                                                                                       
Supports multiple accounts — each user's files are isolated.

✅ File Uploads

Upload images, PDFs, Word, ZIP, and video files.                                                                                                                                                                    
Automatically stored under each user’s unique folder on Cloudinary.                                                                                                                                                
Files appear instantly after upload (no page reload needed).																																																																												

✅ File Preview

Inline previews for images.                                                                                                                                                                                        
PDFs and Word docs open via Google Docs Viewer.                                                                                                                                                                    
Other file types open in a new tab.																																																																																									

✅ File Management

Delete files from Cloudinary with confirmation.                                                                                                            
Only the file owner can delete their own files.                                                                                                
Backend ensures safe user-specific operations.																				

✅ Dynamic Fetching

Auto-refreshes file list after upload/delete.                                                                                                            
Clean grid layout for better visual organization.																																																																																		

✅ Environment Security

Secrets stored securely in .env.local files (not committed to GitHub).                                                                                            
Cloudinary and Firebase credentials loaded via environment variables.																																																																								

🏗️ Tech Stack
Layer	Technology                                                                                                                                                                              
Frontend	     :  React, Material UI, Firebase Auth                                                                                                                                
Backend	       :  Node.js, Express, Multer                                                                                                                                            
Storage	       :  Cloudinary (for file storage)                                                                                                                              
Authentication :  Firebase Google Sign-In                                                                                                                                            
Styling        :	CSS (custom + MUI components)                                                                                                                      

📂 Folder Structure                                                                                                                                                                    
Google-Drive-Clone/                                                                                                                                                                                                
│                                                                                                                                                                                                                   
├── public/                                                                                                                                                                                                        
├── src/                                                                                                                                                                                                            
│   ├── components/                                                                                                                                                                                                 
│   │   ├── auth /                          # Login component                                                                                                                                                
│   │   ├── backend/                        # Express server files                                                                                                                                                
│   │   │   ├── server.js                                                                                                                                                                                        
│   │   │   ├── .env.local                                                                                                                                                                
│   │   ├── filesView/          # FileList.js (file preview + delete)                                                                                                                 
│   │   ├── header/             # Header with profile and search                                                                                                                                        
│   │   ├── sidebar/            # Sidebar + NewFile upload modal                                                                                                                                                
│   │   ├── rightSidebar/       # Additional UI placeholder                                                                                                                                        
│   ├── styles/                 # CSS for components                                                                                                                                                
│   ├── firebase.js             # Firebase configuration                                                                                                                                                
│   ├── App.js                  # Main app logic (auth + routing)                                                                                                                                        
│   └── index.js                # React root entry point                                                                                                                                                        
│                                                                                                                                                                                                        
├── .env.local                  # Frontend environment variables                                                                                                                                                
├── .gitignore                  # Excludes secrets & node_modules                                                                                                                                                
├── README.md                                                                                                                                                                                                       
└── package.json                                                                                                                                                                                                
                                                                                                                                                                                                                
⚙️ Environment Variables

You’ll need two .env.local files:

Frontend → in root /

Backend → in /src/components/backend/

🧩 Frontend .env.local
# Firebase Config
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key                                                                                                                                                                
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain                                                                                                                                                        
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id                                                                                                                                                              
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket                                                                                                                                                
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id                                                                                                                                        
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id                                                                                                                                                                
REACT_APP_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id                                                                                                                                                      

🧠 Backend .env.local                                                                                                                                                                                        
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name                                                                                                                                                                    
CLOUDINARY_API_KEY=your_cloudinary_api_key                                                                                                                                                                        
CLOUDINARY_API_SECRET=your_cloudinary_api_secret                                                                                                                                                                    
PORT=5000                                                                                                                                                                        


⚠️ Add both .env.local files to .gitignore to prevent secret leaks.

🪄 Getting Started                                                                                                                                                                                
1️⃣ Clone the repo                                                                                                                                                                
git clone https://github.com/your-username/google-drive-clone.git                                                                                                                                        
cd google-drive-clone                                                                                                                                                                        

2️⃣ Install Dependencies                                                                                                                                                        
# Frontend
npm install

# Backend
cd src/components/backend
npm install

3️⃣ Start the Backend Server
cd src/components/backend
node server.js


The backend will run at 👉 http://localhost:5000

4️⃣ Start the Frontend

In a new terminal:

npm start


The frontend runs at 👉 http://localhost:3000

🔐 Authentication (Firebase Setup)

Go to Firebase Console

Create a new project → enable Google Sign-In under
Authentication → Sign-in Method → Google.

Copy the configuration keys into .env.local (frontend).

Add http://localhost:3000 to Authorized Domains.

☁️ Cloudinary Setup

Create a Cloudinary Account

Go to Dashboard → API Keys and copy:

Cloud name

API key

API secret

Paste these into your backend .env.local.

Each user’s files are automatically stored in their own sub-folder:

drive-clone/{user_email_sanitized}/

🧹 Core API Routes                                                                                                                                                                                                
Method	Endpoint	Description                                                                                                                                                                                
POST	/upload	Uploads a file to Cloudinary for a specific user                                                                                                                                                    
GET	/files	Fetches all files for the logged-in user                                                                                                                                                            
POST	/delete	Deletes a specific file from Cloudinary                                                                                                                                                             
💡 Known Enhancements (Next Steps)

🧾 Add renaming or folder management

💬 Replace alerts with Material UI Snackbars

📦 Implement pagination or lazy loading

🔍 Add file search functionality

⏳ Add upload progress bar

🧠 Key Learnings

Integration of Firebase Auth with custom Node.js backend.

Securely managing API keys using .env.local.

Handling multi-user file segregation using dynamic Cloudinary folders.

Rendering inline file previews and Google Docs Viewer.

Proper handling of resource types (image, raw, video) for upload/delete.

👨‍💻 Author

Seemant Gupta
💼 Full Stack Developer | 🚀 Cloud & Web Enthusiast                                                                                                                                                                
