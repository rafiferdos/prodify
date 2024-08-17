# Prodify - Client Side

Welcome to the **Prodify** e-commerce platform! This repository contains the client-side code of the application built using React and integrated with Firebase. The website allows users to explore, filter, and search products, offering features like sorting, pagination, and category-based filtering.

The live version of the application is available [here](https://prodify-45241.web.app/).

## Features

- **Product Search**: Search for products by name using a search bar with real-time results.
- **Category Filter**: Filter products by different categories.
- **Sorting Options**: Sort products by price (Low to High, High to Low) and by the date added (Newest First).
- **Pagination**: Paginate through products with a seamless UI.
- **User Authentication**: Integrated Firebase authentication to manage user sessions.
- **Responsive Design**: Mobile-friendly and optimized for various screen sizes.

## Tech Stack

- **React**: JavaScript library for building user interfaces.
- **Axios**: For making HTTP requests to the backend.
- **TailwindCSS & DaisyUI**: Styling framework for a modern and responsive UI.
- **Firebase**: Authentication and hosting.
- **MongoDB**: Database for storing product information (in the backend).
- **Express.js**: Backend framework for handling API requests (in the backend).
- **Node.js**: Backend environment (in the backend).

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

- Node.js installed (version 16.x or higher recommended)
- Firebase project set up for authentication and hosting

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/rafiferdos/prodify.git
    cd prodify
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Create a `.env` file** and add your environment variables:
    ```
    VITE_API_URL=https://prodify-ebon.vercel.app
    ```

4. **Run the development server**:
    ```bash
    npm run dev
    ```

5. Open your browser and navigate to `http://localhost:9000`.

## Project Structure

```bash
prodify-client/
├── public/             # Public assets
├── src/
│   ├── components/     # Reusable components
│   ├── pages/          # Main pages for the app
│   ├── hooks/          # Custom React hooks
│   ├── provider/       # Context provider for Auth
│   ├── App.jsx         # Main app component
│   ├── index.css       # Global styles
│   ├── main.jsx        # Entry point for the app
├── .env                # Environment variables
├── package.json        # Project configuration and dependencies
└── README.md           # This file
```

## Contact

**Rafi Ferdos**  
GitHub: [rafiferdos](https://github.com/rafiferdos)  
Live Site: [https://prodify-45241.web.app/](https://prodify-45241.web.app/)  
Email: rafiferdos@gmail.com
