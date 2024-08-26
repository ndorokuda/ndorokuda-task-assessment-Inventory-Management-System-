# assessment-task-Inventory-Management-System

# Inventory Management System

This project is an Inventory Management System designed to efficiently manage inventory data with a user-friendly interface. The system is built using a combination of backend and frontend technologies to create a seamless user experience.

## Technologies Used

### Backend
- **Database:** PostgreSQL
- **Framework:** Laravel 11
- **Cache Driver:** Database cache driver for optimized data retrieval and storage
- **Authentication:** Laravel Sanctum for managing user authentication

### Frontend
- **Framework:** React 18 for developing a Single Page Application
- **Routing:** react-router-dom for managing routes in the frontend
- **UI Components:**
  - **Tables:** Material Table for displaying tabular data
  - **Toasts:** react-toastify for displaying toast notifications
  - **Icons:** react-icons for incorporating icons in the UI
  - **Loaders:** react-spinners for showing loading animations
- **Styling:** Tailwind CSS for styling the application
- **PDF Export:** jspdf-autotable and jspdf for exporting tables as PDF documents

## Project Setup

Follow these steps to set up the Inventory Management System:

### Backend Setup
1. Clone the backend repository.
2. **Create PostgreSQL Database:**
   - Create a new PostgreSQL database named `inventory_management`.
   - Set up your username and password for accessing the database.
     ```
     DB_CONNECTION=pgsql
     DB_HOST=127.0.0.1
     DB_PORT=5432
     DB_DATABASE=inventory_management
     DB_USERNAME=your_username
     DB_PASSWORD=your_password
     ```
   - Run database migrations to set up the initial database schema.
     ```
     php artisan migrate

### Frontend Setup
1. Clone the frontend repository.
2. Install required dependencies using npm or yarn.
3. Start the development server to run the frontend application.
   ```
   npm run dev

 **Access the Application:**
   - Access the Inventory Management System through your web browser.
   - Log in with your credentials and start managing your inventory.

## Features

- **User Authentication:** Utilizes Laravel Sanctum for secure user authentication.
- **Database Optimization:** Uses PostgreSQL and database cache driver for optimized data handling.
- **Responsive Design:** Implemented using React and Tailwind CSS for a responsive user interface.
- **PDF Export:** Enables exporting tables as PDF using jspdf-autotable and jspdf.
- **Interactive UI Elements:** Includes Material Table, react-toastify, react-icons, and react-spinners for enhanced user interaction.

## Usage

1. **Login:** Users can log in using their credentials.
2. **View Inventory:** Access and manage inventory items.
3. **Export Data:** Export tables as PDF for offline use.


