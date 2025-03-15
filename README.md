# Internshala Automation

Effortlessly search, apply for, and track internship applications on Internshala using user-defined preferences, saving significant time and effort.

## 🚀 Features

- **🔍 Automated Job Search:** Finds internships based on user-defined preferences, ensuring relevant opportunities are discovered efficiently.
- **📩 Automated Application Submission:** Applies for internships with pre-filled information and personalized responses powered by Google Generative AI.
- **📊 Application Status Tracking:** Monitors the status of applications and keeps users informed with real-time updates.

## 🛠 Prerequisites

Ensure the following dependencies are installed before running the application:

- **Node.js**: Install [Node.js](https://nodejs.org/) (v14+ recommended).
- **Google Chrome**: Required for Puppeteer to handle browser automation.
- **Puppeteer Dependencies**: Some systems may require additional dependencies. Install them with:
  ```bash
  sudo apt-get install -y libgbm-dev
  ```
  (For Linux users, ensure all required dependencies are installed for headless Chrome.)

## 🔧 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd internshala-automation
```

### 2️⃣ Install Dependencies

```bash
npm install
```

⚠️ **Note:** Currently, the project has no predefined dependencies in `package-lock.json`. Running `npm install` will ensure any necessary dependencies are added automatically.

### 3️⃣ Configure Environment Variables

Create a `.env` file in the project root and add the following:

```env
EMAIL=<your-internshala-email>
PASSWORD=<your-internshala-password>
API_KEY=<your-google-generative-ai-api-key>
RESUME_DATA=<path-to-your-resume.json>
```

⚠️ **Security Note:** Never share your credentials or hardcode them in the script. Use `.env` to store sensitive information.

### 4️⃣ Run the Application

```bash
node index.js
```

## 📞 Support

For issues and inquiries, reach out via:

- Email: [support@example.com](mailto:support@example.com)
- GitHub Issues: [Open an issue](https://github.com/your-repo/issues)

## 🤝 Contributions

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch (`feature-branch-name`).
3. Commit your changes.
4. Submit a pull request.

## 📜 License

This project is licensed under the **MIT License**. Feel free to use, modify, and distribute as per the license terms.

---

🌟 **Happy Automating!** 🚀
