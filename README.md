# 🎓 ScholarX – Scholarship Management System

**ScholarX** is a modern web-based platform designed to streamline the scholarship application, review, and management process for students, administrators, and scholarship providers / Moderator.

---

## 🌐 Live URL

🔗 [https://scholar-x-793f6.web.app/](https://scholar-x-793f6.web.app/)

---

## 🎯 Purpose

ScholarX aims to:
- Simplify the scholarship application process for students.
- Provide an intuitive admin dashboard for reviewing and managing applications.
- Offer role-based access for users, moderators, and administrators.
- Centralize communication, evaluation, and scholarship tracking in one system.

---

## 🚀 Key Features

- 🧑‍🎓 **Student Portal** – Apply for scholarships, track progress, receive notifications.
- 🛠️ **Admin Dashboard** – Manage users, review applications, publish results.
- 🔐 **Role-Based Access** – User, Moderator, Admin with custom views and permissions.
- 📥 **Application Workflow** – Apply, approve, reject, update, and archive applications.
- 💰 **Payment Integration** – For application fees and service charges.
- 📊 **Analytics Dashboard** – Visual summary of applicants, status, and performance.
- 📱 **Responsive Design** – Works across desktop, tablet, and mobile devices.
- 🔍 **Search & Filter** – Easily find scholarships by name, university, or degree.
- ⭐ **Review System** – Students can review and rate scholarships they've applied to.
- 📝 **Scholarship Management** – Create, edit, and manage scholarship listings.

---

## 🧩 Technologies Used

### Frontend
| Technology | Purpose |
|------------|---------|
| [React](https://reactjs.org/) | Core UI library |
| [React Router](https://reactrouter.com/) | Routing and navigation |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |
| [DaisyUI](https://daisyui.com/) | Tailwind CSS components |
| [Vite](https://vitejs.dev/) | Build tool and development server |

### Backend & Services
| Service | Purpose |
|---------|---------|
| [Firebase](https://firebase.google.com/) | Authentication, Firestore, Hosting |
| [ImgBB](https://imgbb.com/) | Image hosting for university logos |
| [Vercel](https://vercel.com/) | API server hosting |

### NPM Packages
| Package | Purpose |
|--------|---------|
| [`axios`](https://axios-http.com/) | HTTP client for API requests |
| [`react-hot-toast`](https://react-hot-toast.com/) | Toast notifications |
| [`react-icons`](https://react-icons.github.io/react-icons/) | Icon library |
| [`react-responsive-carousel`](https://www.npmjs.com/package/react-responsive-carousel) | Responsive image carousel |
| [`react-responsive-modal`](https://www.npmjs.com/package/react-responsive-modal) | Responsive modals |
| [`react-tooltip`](https://react-tooltip.com/) | Tooltips |
| [`sweetalert2`](https://sweetalert2.github.io/) | Alert modals and confirmations |
| [`swiper`](https://swiperjs.com/react) | Mobile-friendly slider/carousel library |
| [`recharts`](https://recharts.org/) | Data visualization components |

---

## 🏗️ Project Structure

```
scholar-x-client/
├── public/
│   ├── logo.png
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── Components/
│   │   ├── Dashboard/
│   │   │   └── Sidebar/
│   │   ├── Container.jsx
│   │   ├── Footer.jsx
│   │   ├── Loading.jsx
│   │   ├── Navbar.jsx
│   │   └── ScrollToTop.jsx
│   ├── firebase/
│   │   └── firebase.config.js
│   ├── hooks/
│   │   └── useUserRole.js
│   ├── Layouts/
│   │   ├── DashboardLayout.jsx
│   │   └── MainLayout.jsx
│   ├── Pages/
│   │   ├── AboutUs/
│   │   ├── AllScholarships/
│   │   ├── ApplyScholarship/
│   │   ├── Authentication/
│   │   │   ├── Login/
│   │   │   ├── Register/
│   │   │   └── SocialLogin/
│   │   ├── Contact/
│   │   ├── Dashboard/
│   │   │   ├── AddScholarship/
│   │   │   ├── AllAppliedScholarships/
│   │   │   ├── AllReviews/
│   │   │   ├── DashboardHome/
│   │   │   ├── ManageScholarships/
│   │   │   ├── ManageUsers/
│   │   │   ├── MyApplications/
│   │   │   ├── MyReviews/
│   │   │   └── Profile/
│   │   │       └── Admin/
│   │   ├── ErrorPage/
│   │   ├── Home/
│   │   ├── PaymentSuccess/
│   │   ├── PrivacyPolicy/
│   │   ├── ScholarshipDetails/
│   │   ├── TermsOfService/
│   ├── PrivateRoute/
│   │   └── PrivateRoute.jsx
│   ├── Provider/
│   │   └── AuthProvider.jsx
│   ├── Router/
│   │   └── Router.jsx
│   ├── index.css
│   └── main.jsx
├── .env.local
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🔐 Authentication

ScholarX uses Firebase Authentication for user management with:
- Email/password registration and login
- Google OAuth integration
- Role-based access control (User, Moderator, Admin)
- Protected routes for dashboard access

---

## 🗃️ Data Management

The application uses a combination of:
- **Firebase Authentication** for user authentication
- **Custom REST API** (hosted on Vercel) for scholarship data, applications, and reviews
- **ImgBB API** for image hosting of university logos

### API Endpoints
The application communicates with a backend API at `https://scholar-x-server-khaki.vercel.app` with endpoints for:
- Scholarship management
- User applications
- Reviews and ratings
- User role management
- Payment processing

---

## 🎨 UI/UX Features

- **Responsive Design**: Works on all device sizes
- **Role-based Navigation**: Different dashboards for users, moderators, and admins
- **Interactive Components**: Carousels, modals, tooltips, and notifications
- **Loading States**: Smooth loading indicators for better UX
- **Form Validation**: Client-side validation for all forms
- **Error Handling**: Graceful error handling with user feedback

---

## 🎯 User Roles

### 1. Student/User
- Browse and search scholarships
- View detailed scholarship information
- Apply for scholarships with payment processing
- Track application status
- Submit reviews and ratings
- Manage personal profile

### 2. Moderator
- All user features
- Add new scholarships
- Manage existing scholarships
- Review all applications
- Manage all reviews

### 3. Admin
- All moderator features
- User management (promote/demote users)
- Analytics dashboard
- Complete system oversight

---

## 📱 Key Pages & Components

### Public Pages
- **Home Page**: Featured scholarships, testimonials, and site overview
- **All Scholarships**: Browse all scholarships with search and filtering
- **Scholarship Details**: Comprehensive information about a specific scholarship
- **Authentication**: Login and registration pages
- **About Us**: Information about the platform
- **Contact Us**: Contact form and information
- **Legal Pages**: Privacy Policy and Terms of Service

### Dashboard Pages
- **User Dashboard**: Profile management and application tracking
- **Moderator Dashboard**: Scholarship and application management
- **Admin Dashboard**: Complete system management and analytics

---

## 🛠️ Development Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/borhansiddque/scholar-x-client.git
   ```

2. Navigate to the project directory:
   ```bash
   cd scholar-x-client
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env.local` file with the following variables:
   ```env
   VITE_apiKey=your_firebase_api_key
   VITE_authDomain=your_firebase_auth_domain
   VITE_projectId=your_firebase_project_id
   VITE_storageBucket=your_firebase_storage_bucket
   VITE_messagingSenderId=your_firebase_messaging_sender_id
   VITE_appId=your_firebase_app_id
   VITE_imgbbApiKey=your_imgbb_api_key
   VITE_API_URL=your_api_url
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

### Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run deploy`: Build and deploy to Firebase

---

## 🚀 Deployment

The application is configured for deployment to Firebase Hosting:
1. Build the project: `npm run build`
2. Deploy: `npm run deploy`

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

---

## 📞 Contact

For support or inquiries, please contact:
- **Email**: borhansiddque19@gmail.com
- **LinkedIn**: [Borhan Siddque](https://www.linkedin.com/in/borhan-siddque/)
- **Facebook**: [Borhan Siddque](https://www.facebook.com/borhan.siddque.19/)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
