# BMI Calculator Application

## Description
This application provides a BMI (Body Mass Index) calculator and keeps track of historical BMI calculations.

## Installation
1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Start the server using `nodemon root.js`.

## Usage
- The server runs on port 3000.
- Access the BMI Calculator in a web browser at `http://localhost:3000/bmicalculator`.
- View the history of BMI calculations at `http://localhost:3000/history`.

## Dependencies
- **Express:** Used for server setup and routing.
- **Body-parser:** Middleware for parsing incoming request bodies.
- **Axios:** Handles HTTP requests.
- **Path:** Helps manage file paths.

## Running the Server
The server script is located in `root.js`. Start the server using `nodemon root.js`.

## File Structure
- `views/`: Contains client-side files (HTML, CSS, JS).
- `routes/`: Server-side routes for request handling.
- `bmiData.json`: Stores historical BMI calculation data.
