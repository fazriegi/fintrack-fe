# FinTrack FE

###### FinTrack FE

FinTrack FE is a frontend application for managing assets, liabilities, and personal finance tracking with a minimalist and user-friendly interface.

## Technology Stack

`JavaScript` `React`

## Features

- User Registration
- User Login

## Demo

**LIVE URL** : `https://link-to-live-url`

## Installation

Follow these steps to install and run FinTrack on your local machine:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/fazriegi/fintrack-fe.git <your_project_name>
   ```

2. **Move to cloned repository folder**

   ```bash
   cd <your_project_name>
   ```

3. **Install dependecies**

   ```bash
   npm i
   ```

4. **Copy `example.config.json` to `config.json`**

   ```bash
   cp .env.example .env
   ```

5. **Configure your `.env`**
6. **Run the app**

   ```bash
   npm run dev
   ```

## Running with Docker (Recommended)

You can run the frontend application inside a container served via an optimized Nginx server using Docker and Docker Compose.

### Prerequisites

Make sure you have [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed.

### Steps to Run

1. **Copy `.env.example` to `.env`:**

   ```bash
   cp .env.example .env
   ```

2. **Configure your `.env`:**
   Adjust `VITE_BASE_URL` (points to the backend API), `VITE_APP_NAME`, and `PORT` (the port on your host machine to access the frontend, default: `3000`).

3. **Build and start the container:**

   ```bash
   docker compose up --build -d
   ```

   _Note: This will read the `.env` variables, pass them as build arguments to compile the production static files, and serve them via a lightweight Nginx container._

4. **Access the application:**
   Open your browser and navigate to `http://localhost:<PORT>` (e.g. `http://localhost:3000`).

5. **Check container status:**

   ```bash
   docker compose ps
   ```

6. **View logs:**

   ```bash
   docker compose logs -f
   ```

7. **Stop the container:**
   ```bash
   docker compose down
   ```

## Author

Fazri Egi - [Github](https://github.com/fazriegi)
