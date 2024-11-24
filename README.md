## Project Overview

The application consists of the following components:
- Backend: Java Spring Boot application (Dockerized)
- Frontend: React Native application with Storybook components

## Ports:
   - Port 8080: Swagger UI for Backend APIs
   - Port 3000: Frontend React JS Application
   - Port 6006: Frontend Storybook for React Components

## Getting Started (via Local Development)

To get started with local development, follow these steps:

0. Ensure that you have Java 17 (or higher), Docker and Node.JS 18 (or higher) installed on your machine.
1. Run `docker compose up -d` on the root repository folder.
2. Go to the `frontend` folder and run `npm install`. Similarly, go to the `backend` folder and run `mvn clean install -DskipTests=true`.
3. In the `frontend` folder, run `npm run start` and `npm run storybook` in different terminal windows.
4. In the `backend` folder, run `mvn spring-boot:run` in a terminal window.

