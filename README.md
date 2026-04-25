# Cybersecurity Threat Intelligence Dashboard

A modern, responsive React-based dashboard for real-time cybersecurity threat monitoring and analysis. Built with React, Redux, Tailwind CSS, and NVD API integration.

## 🎯 Features

### Core Features (4 Advanced)
✅ **Dark Mode Toggle** - Persistent theme switching with localStorage  
✅ **Real-time Refresh** - Auto-refresh threats every 30-60 seconds  
✅ **Search + Filter + Sort** - Advanced filtering with debounced search  
✅ **Charts & Analytics** - Severity distribution, timeline, CVSS analysis  

### Additional Features
- 📊 Interactive charts (Recharts)
- 🔍 Debounced search for performance
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎨 Dark/Light mode with persistence
- ⚡ Pagination (20 items per page)
- 🛡️ Error boundaries and error handling
- 📈 Real-time statistics dashboard
- 🔗 Detailed threat view with references

---

## 🛠️ Tech Stack

- **Frontend**: React 18+, Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **API Client**: Axios
- **Icons**: Lucide React
- **Data Source**: NVD (National Vulnerability Database) API

---

## 📋 Project Structure

```
cybersecurity-dashboard/
├── public/                    # Static assets
├── src/
│   ├── components/            # React components
│   │   ├── Navbar.jsx
│   │   ├── SearchBar.jsx
│   │   ├── FilterPanel.jsx
│   │   ├── ThreatCard.jsx
│   │   ├── ThreatList.jsx
│   │   ├── Charts.jsx
│   │   └── ErrorBoundary.jsx
│   ├── pages/                 # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Threats.jsx
│   │   ├── ThreatDetail.jsx
│   │   └── Settings.jsx
│   ├── store/                 # Redux store
│   │   ├── store.js
│   │   └── slices/
│   │       ├── threatSlice.js
│   │       ├── filterSlice.js
│   │       └── uiSlice.js
│   ├── hooks/                 # Custom hooks
│   │   └── useAutoRefresh.js
│   ├── utils/                 # Utility functions
│   │   └── debounce.js
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── index.html                 # HTML template
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind configuration
├── postcss.config.js          # PostCSS configuration
├── package.json               # Dependencies
├── .gitignore                 # Git ignore rules
└── README.md                  # This file
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/Yaxu17/cybersecurity-dashboard.git
cd cybersecurity-dashboard
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The app will open at `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
```

The optimized build will be in the `dist/` folder.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 📱 Usage

### Dashboard
- View real-time statistics and threat overview
- See threat distribution across severity levels
- Monitor CVSS score trends
- Quick access to recent threats

### Threat Intelligence
- **Search**: Type CVE ID or vulnerability name (auto-debounced)
- **Filter**: 
  - By severity (Critical, High, Medium, Low)
  - By CVSS score (0-10 range)
  - By sort order (Date, Severity, CVSS)
- **Pagination**: Navigate through 20 threats per page
- **View Details**: Click any threat card to see full information

### Threat Detail View
- Complete CVE information
- CVSS score with severity interpretation
- Published and modified dates
- External references and links
- Mitigation information

### Settings
- ⚙️ Toggle dark mode
- 🔄 Configure auto-refresh interval (30-300 seconds)
- 💾 Clear cache
- 📊 View dashboard information

---

## 🔗 API Integration

### NVD (National Vulnerability Database)
- **Endpoint**: `https://services.nvd.nist.gov/rest/json/cves/1.0`
- **Authentication**: None required (public API)
- **Rate Limit**: 5 requests per 30 seconds
- **Data**: Real-time CVE vulnerability records

The app automatically handles rate limiting with intelligent caching and pagination.

---

## 🎨 Features in Detail

### Dark Mode Toggle
- Persistent storage using localStorage
- Smooth transitions between light/dark themes
- System preference detection
- Consistent theming across all components

### Real-time Refresh
- Auto-refresh with configurable interval (30-300 seconds)
- Manual refresh button with loading indicator
- "Last updated" timestamp display
- Preserves current page/filters during refresh

### Search + Filter + Sort
- **Debounced Search**: 500ms delay to optimize performance
- **Multi-criteria Filtering**: Combine severity, CVSS score, and sort options
- **Live Filtering**: Instant results as you type
- **Pagination**: Prevents DOM overload with 20 items per page

### Charts & Analytics
- **Severity Distribution**: Pie chart showing threat breakdown
- **Timeline**: Line chart of threats over 30 days
- **CVSS Distribution**: Bar chart of score ranges
- **Statistics Cards**: Total threats, critical count, average CVSS

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

#### Option 1: Using Vercel CLI
```bash
npm install -g vercel
vercel
# Follow the prompts
```

#### Option 2: Using GitHub Integration
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New" → "Project"
4. Select your repository
5. Click "Deploy"

**Your app will be live at**: `https://cybersecurity-dashboard-[username].vercel.app`

---

### Deploy to Netlify

#### Option 1: Using Netlify CLI
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

#### Option 2: Using Netlify UI
1. Build locally: `npm run build`
2. Go to [app.netlify.com](https://app.netlify.com)
3. Drag & drop the `dist` folder
4. Your app is live!

**Your app will be at**: `https://cybersecurity-dashboard-[random].netlify.app`

---

## 📊 Performance Optimizations

✅ **Debounced Search**: Reduces unnecessary API calls  
✅ **Pagination**: Prevents DOM overload with large datasets  
✅ **Memoization**: React.memo on chart components  
✅ **Code Splitting**: Lazy loading of Settings and Analytics pages  
✅ **Caching**: Redux stores threat data to avoid duplicate fetches  
✅ **Responsive Design**: Optimized rendering for all screen sizes  

---

## 🛡️ Error Handling

- **Error Boundaries**: Catches component errors gracefully
- **API Error Handling**: User-friendly messages for network issues
- **Fallback UI**: Shows empty states when data is unavailable
- **Retry Mechanisms**: Manual refresh button for failed requests

---

## 🔒 Security

- ✅ No backend server (frontend-only)
- ✅ No AI/ML components
- ✅ All data from public APIs
- ✅ No sensitive data storage
- ✅ HTTPS support on deployment

---

## 📝 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

---

## 🚧 Future Enhancements

- User authentication
- Custom threat feeds
- Threat export (CSV/PDF)
- Browser notifications
- Mobile app (React Native)
- Advanced analytics
- Threat comparison tool

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [React Router](https://reactrouter.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Recharts](https://recharts.org)
- [NVD API](https://nvd.nist.gov/developers)

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

---

## 📞 Contact

- **GitHub**: [@Yaxu17](https://github.com/Yaxu17)
- **Email**: For inquiries, please open an issue

---

## ✨ Capstone Project Requirements

✅ **Frontend-only**: Pure React application  
✅ **Public APIs**: Uses free NVD API  
✅ **No AI/ML**: Pure data filtering and visualization  
✅ **4 Advanced Features**: Dark mode, Real-time refresh, Search/Filter/Sort, Charts  
✅ **Fully Responsive**: Mobile, tablet, desktop  
✅ **Deployed**: Live on Vercel/Netlify  
✅ **Error Handling**: Comprehensive error boundaries  
✅ **Code Quality**: Clean, documented, production-ready  

---

**Built with ❤️ for cybersecurity awareness**
# CyberSecurity-Awarness-App
