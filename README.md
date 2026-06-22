🏨 StayNova — Hotel Catalog Platform

StayNova is a full-stack hotel catalog platform where users can browse, create, edit, and delete hotel listings — with secure authentication, authorization, and cloud-based image management.


🔗 Live Demo: [View StayNova](https://delta-project-j8uf.onrender.com/)  |  💻 GitHub: Riju-hub/StayNova




📸 Screenshots
<img width="1900" height="885" alt="image" src="https://github.com/user-attachments/assets/2317bd9b-fe52-47cd-b5aa-6ef9db2d48c9" />
<img width="1037" height="796" alt="image" src="https://github.com/user-attachments/assets/d761bcfe-06fa-4dec-8b4e-dc43a30faa00" />
<img width="832" height="462" alt="image" src="https://github.com/user-attachments/assets/edf6aad7-1eda-462d-94fd-b4d6fdbe7e83" />
<img width="847" height="365" alt="image" src="https://github.com/user-attachments/assets/f5e37284-2955-4a91-ab5a-8a8ebc49b1ed" />
<img width="1102" height="800" alt="image" src="https://github.com/user-attachments/assets/502ce944-4645-4097-b7c1-02b7928cc1cb" />





✨ Features


🔐 User Authentication — Secure Signup & Login using Passport.js (salted & hashed passwords)
🛡️ Authorization — Only listing owners can edit or delete their own listings
🏡 CRUD Operations — Create, Read, Update, and Delete hotel listings
🖼️ Image Uploads — Multi-image upload with Cloudinary (images stored on the cloud, not the server)
✅ Form Validation — Server-side validation using Joi before saving to the database
⚠️ Error Handling — Custom ExpressError class with a global error handler
📱 Responsive UI — Built with Tailwind CSS and Bootstrap for all screen sizes
☁️ Cloud Deployment — Backend on Render, Database on MongoDB Atlas



🛠️ Tech Stack

LayerTechnologyBackendNode.js, Express.jsFrontendEJS (Server-Side Rendering), Tailwind CSS, BootstrapDatabaseMongoDB Atlas (via Mongoose)AuthenticationPassport.js (Local Strategy)Image StorageCloudinary + MulterValidationJoiDeploymentRender (Backend), MongoDB Atlas (DB)


📁 Project Structure

StayNova/
├── controllers/        # Business logic (Listings, Reviews, Users)
├── init/               # Database seeding scripts
├── models/             # Mongoose schemas (Listing, Review, User)
├── public/             # Static assets (CSS, JS)
├── routes/             # Express route definitions
├── utils/              # ExpressError class & wrapAsync helper
├── views/              # EJS templates (layouts, listings, users)
├── app.js              # Main application entry point
├── Middleware.js        # isLoggedIn & isOwner middleware
├── CloudConfig.js       # Cloudinary configuration
├── schema.js           # Joi validation schemas
└── package.json        # Dependencies


⚙️ Getting Started

Prerequisites


Node.js (v18+)
MongoDB Atlas account
Cloudinary account


Installation

1. Clone the repository

bashgit clone https://github.com/Riju-hub/StayNova.git
cd StayNova

2. Install dependencies

bashnpm install

3. Create a .env file in the root directory and add the following:

envATLASDB_URL=your_mongodb_atlas_connection_string
SECRET=your_session_secret_key
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

4. (Optional) Seed the database

bashnode init/index.js

5. Start the server

bashnode app.js

Open your browser and go to http://localhost:8080


🔑 Key Implementation Details

MVC Architecture

The project strictly follows MVC — Models define the data schemas, Views are EJS templates, and Controllers handle request/response logic. Routes simply map URLs to the appropriate controller functions.

Authentication & Authorization


Passport.js handles session-based login/signup with password hashing
isLoggedIn middleware in Middleware.js protects routes that require a logged-in user
isOwner middleware ensures only the creator of a listing can modify or delete it


Cloudinary Image Upload


multer processes incoming multipart/form-data file uploads
multer-storage-cloudinary streams files directly to Cloudinary
The returned secure URL and filename are saved in MongoDB


Error Handling


wrapAsync in utils/ wraps async controller functions to catch errors automatically
ExpressError is a custom class that extends the built-in Error with a status code
A global error-handling middleware at the bottom of app.js renders a user-friendly error page



🚀 Deployment

ServicePlatformBackendRenderDatabaseMongoDB AtlasImagesCloudinary


📬 Contact

Bhabasindhu Das


📧 Gmail: bhabasindhudas621@gmail.com
💼 LinkedIn: [(your LinkedIn URL)](http://linkedin.com/in/bhabasindhu-das-71b147370)
🐙 GitHub: Riju-hub
