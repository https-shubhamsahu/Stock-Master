# StockMaster - Inventory Management System

StockMaster is a modern, modular Inventory Management System (IMS) designed to digitize and streamline all stock-related operations for a business. It provides a real-time, centralized, and easy-to-use platform for managing products, tracking inventory, and handling various stock operations.

![StockMaster Dashboard](https://storage.googleapis.com/aifire.dev/Images/stockmaster_dashboard_2.png)

## ✨ Key Features

- **Authentication**: Secure user login and registration with email/password and Google social sign-in.
- **Dashboard**: An at-a-glance overview of key inventory metrics, including total stock, low-stock items, pending operations, and a chart of top products.
- **Product Management**: Full CRUD (Create, Read, Update, Delete) functionality for managing your product catalog.
- **Real-Time Inventory Tracking**: View current stock levels, including on-hand, available, and reserved quantities across different locations.
- **Inventory Operations**: Dedicated modules for managing all stock movements:
    - **Receipts**: Track incoming stock from vendors.
    - **Delivery Orders**: Manage outgoing goods for customer shipments.
    - **Internal Transfers**: Log stock movements between internal warehouse locations.
    - **Stock Adjustments**: Correct discrepancies between physical and recorded stock.
- **Move History**: A comprehensive ledger (stock ledger) of all inventory movements for traceability and auditing.
- **AI-Powered Alerts**: Proactive low-stock warnings on the dashboard, powered by Genkit and Google Gemini.
- **Modular Architecture**: Built with clean, separated concerns for maintainability and scalability.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **State Management**: React Context & Hooks
- **Database**: [Cloud Firestore](https://firebase.google.com/docs/firestore)
- **Authentication**: [Firebase Authentication](https://firebase.google.com/docs/auth)
- **Generative AI**: [Genkit (Google Gemini)](https://firebase.google.com/docs/genkit)
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) for validation

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/stockmaster-app.git
    cd stockmaster-app
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of your project and add your Firebase configuration details. You can get these from your Firebase project settings.

    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    ```

### Running the Application

To start the development server, run:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/stockmaster-app/issues).

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.
