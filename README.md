# Engineering Dashboard

A comprehensive, mobile-friendly web application designed for tradespeople, apprentices, and engineers. This professional dashboard provides access to essential engineering tools, reference materials, and community features.

## 🌟 Features

### 🔐 Authentication
- Secure login/logout system
- JWT-based session management
- Role-based access (user/admin)
- Default admin credentials: `admin` / `admin123`

### 🛠️ Core Technical Pages
1. **Welding** - Joint types, weld symbols, MIG/TIG/STICK settings, defect identification
2. **Grinding** - Wheel selection, speeds, safety guidelines
3. **Turning** - Speeds & feeds, thread cutting, depth of cut charts
4. **Milling** - Tool selection, cutting parameters, workholding
5. **Drilling & Tapping** - Drill bit charts, tap selection, thread specifications
6. **Charts & Conversions** - Thread pitch, drill bits, hardness scales, surface finish
7. **Tooling & Geometry** - Tool angles, insert selection, geometry optimization
8. **Materials** - Material properties, selection guides, heat treatment
9. **Safety & PPE** - Safety guidelines, personal protective equipment

### 📊 Interactive Tools
- **Welding Calculator** - MIG/TIG/STICK settings based on material thickness
- **Thread Pitch Converter** - Metric to imperial thread conversions
- **Drill Bit Converter** - Fraction to decimal to metric conversions
- **Hardness Converter** - Brinell, Rockwell, Vickers scale conversions
- **Surface Finish Chart** - Ra, Rz, N values with applications

### 🌐 Community Features
- **Forum** - Post/reply system for sharing tips and asking questions
- **Feedback System** - Report accuracy issues or request changes
- **User Notes** - Personal notes per page (localStorage or database)

### 📱 Mobile-First Design
- Responsive layout for all screen sizes
- Touch-friendly interface
- Collapsible navigation
- Optimized for field use

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd engineering-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   npm run db:setup
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Open [http://localhost:3000](http://localhost:3000)
   - Login with: `admin` / `admin123`

## 🏗️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Modern icon library
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation

### Backend
- **Next.js API Routes** - Server-side API endpoints
- **SQLite** - Lightweight database
- **Better SQLite3** - High-performance SQLite driver
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
engineering-dashboard/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Main dashboard page
│   ├── welding/          # Welding tools page
│   ├── charts/           # Charts & conversions
│   └── globals.css       # Global styles
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── layout/           # Layout components
│   ├── welding/          # Welding-specific components
│   └── charts/           # Chart components
├── lib/                  # Utility libraries
│   ├── auth.ts           # Authentication utilities
│   └── database.ts       # Database utilities
├── scripts/              # Setup scripts
│   └── setup-db.js       # Database initialization
└── data/                 # SQLite database files
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
```

### Database Setup
The application uses SQLite for simplicity. The database is automatically created when you run:

```bash
npm run db:setup
```

This creates:
- User authentication tables
- Forum system tables
- Feedback request system
- Content verification tracking

## 📚 Available Pages

### Technical Reference Pages
- **`/welding`** - Comprehensive welding guides and calculators
- **`/turning`** - Lathe operations and thread cutting
- **`/milling`** - Milling operations and tool selection
- **`/drilling`** - Drill bit charts and tapping guides
- **`/charts`** - Conversion tables and reference charts
- **`/tooling`** - Tool geometry and selection guides
- **`/materials`** - Material properties and selection
- **`/safety`** - Safety guidelines and PPE requirements

### Community & Support
- **`/forum`** - Community discussion forum
- **`/help`** - Help documentation
- **`/guides`** - How-to guides and tutorials
- **`/feedback`** - Report issues or request changes

## 🎯 Key Features

### Interactive Calculators
- **Welding Settings** - Automatic calculation of current, voltage, wire speed
- **Thread Conversions** - Metric to imperial thread pitch conversions
- **Drill Bit Sizing** - Fraction to decimal to metric conversions
- **Hardness Scales** - Brinell, Rockwell, Vickers conversions

### Reference Charts
- **Thread Pitch Table** - Complete metric/imperial thread reference
- **Drill Bit Chart** - Fraction, decimal, metric, and number sizes
- **Hardness Conversion** - Material hardness across different scales
- **Surface Finish** - Ra, Rz, N values with applications

### Safety & Quality
- **Safety Warnings** - Prominent safety reminders on technical pages
- **Accuracy Tracking** - Content verification system with user feedback
- **Quality Indicators** - Visual indicators for verified content

## 🔒 Security Features

- **JWT Authentication** - Secure token-based sessions
- **Password Hashing** - bcrypt for secure password storage
- **Role-Based Access** - User and admin roles
- **Input Validation** - Zod schema validation
- **SQL Injection Protection** - Parameterized queries

## 📱 Mobile Optimization

- **Responsive Design** - Works on all screen sizes
- **Touch-Friendly** - Optimized for mobile interaction
- **Offline Capable** - Local storage for user notes
- **Fast Loading** - Optimized for slow connections

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Setup
1. Set `NODE_ENV=production`
2. Configure `JWT_SECRET` with a strong secret
3. Set up a production database (PostgreSQL recommended for production)
4. Configure reverse proxy (nginx) for SSL termination

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support or questions:
- Check the `/help` page in the application
- Use the feedback system to report issues
- Contact the development team

## 🔄 Updates

The application includes an automatic update system that tracks:
- Content verification status
- User feedback and accuracy reports
- Database schema updates
- Security patches

---

**Built with ❤️ for the engineering community**