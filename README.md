# Lemnisk Job Scheduler Application

This is a job scheduling application that uses Kafka for asynchronous messaging and job scheduling. The application allows users to schedule jobs that can be one-time, recurring, or delayed. It communicates with a Kafka broker to send job messages.

## Table of Contents

- [Design Decisions](#design-decisions)
- [Assumptions](#assumptions)
- [How to Build and Run the Application](#how-to-build-and-run-the-application)
- [How to Use the Application](#how-to-use-the-application)
- [Job Scheduling and Execution](#job-scheduling-and-execution)
- [Asynchronous Messaging with Kafka](#asynchronous-messaging-with-kafka)
- [Troubleshooting](#troubleshooting)

---

## Design Decisions

- **Frontend**: ReactJS is used for building the UI. It allows users to input job details and schedule jobs. (in pages/api/index.js)
- **Backend**: The backend is built using Node.js and Next.js API routes. The `kafkajs` library is used to interact with Kafka for asynchronous job scheduling. (pages/schedule.js)
- **Kafka**: Kafka is used to send job messages to a Kafka topic (`jobs-topic`), where the jobs are processed asynchronously.
- **Docker**: Docker Compose is used to set up Kafka and Zookeeper for message brokering.

---

## Assumptions

- Kafka and Zookeeper are set up and running locally.
- You are familiar with Docker, React, and Kafka.
- You have Node.js installed on your machine.
- Job execution logic is simplified for demonstration. In production, jobs would typically be consumed and processed by separate consumers.

---

## How to Build and Run the Application

### Prerequisites

- **Node.js** (version >=14)
- **Docker** and **Docker Compose**
- **Kafka Broker** (can be set up using Docker Compose as outlined below)

### Steps to Set Up and Run

1. **Clone the repository**:

   ```bash
   git clone https://github.com/RushiMayur/lem-job-sched
   cd lem-job-sched
   ```

2. **Install dependencies**:

   In the project directory, install the necessary dependencies:

   ```bash
   npm install
   ```

3. **Set up Kafka and Zookeeper** (using Docker Compose):

   - In the project directory, make sure the `docker-compose.yml` file is configured with the correct Kafka and Zookeeper settings.
   - Run the following command to start Kafka and Zookeeper:

   ```bash
   docker-compose up
   ```

4. **Start the backend and frontend**:

   - Start the backend server (Next.js):

   ```bash
   npm run dev
   ```

   - Start the frontend (React):

   ```bash
   npm start
   ```

5. **Access the application**:
   Open your browser and go to `http://localhost:3000` to use the job scheduler.

---

## How to Use the Application

- **Input Job Details**: The frontend UI will ask you to fill in the following fields:
  - Job Name
  - Time Zone
  - Time
  - Job Type (One-Time, Immediate, Delayed, Recurring)
  - Frequency (for recurring jobs: Hourly, Daily, Weekly, Monthly)
  - Days (for weekly frequency)
  - Dates (for monthly frequency)
  - Delay (for delayed jobs)
  - Kafka Topic
  - Kafka Payload (in JSON format)

- **Submit Job**: Once the job details are filled in, click the "Schedule Job" button. The job will be sent to the backend, where it will be processed and sent to the Kafka broker.

- **Job Details Confirmation**: Upon successful job scheduling, you will see an alert with the job details.

---

## Job Scheduling and Execution

### Job Scheduling

1. **One-Time Jobs**: A one-time job will execute at the specified time. It is scheduled for a specific date and time.
2. **Recurring Jobs**: Recurring jobs are scheduled based on the selected frequency (e.g., daily, weekly, monthly). For weekly jobs, you can choose specific days of the week. For monthly jobs, you can specify the dates.
3. **Delayed Jobs**: These jobs are scheduled with a delay (in minutes) and will be triggered after the specified time delay.

### Job Execution

Jobs are executed asynchronously. For demonstration purposes, they are sent to Kafka and can be consumed by a Kafka consumer. The job execution itself (such as actually running tasks like sending emails, triggering other services, etc.) would be implemented by Kafka consumers.

---

## Asynchronous Messaging with Kafka

### Kafka Integration

- **Producer**: The backend uses the `kafkajs` library to create a Kafka producer, which connects to a Kafka broker and sends job messages to a Kafka topic (`jobs-topic`).
- **Message Format**: The job details are sent as JSON objects containing all necessary information (e.g., job name, time, frequency, etc.).
- **Consumer**: In a real-world application, you would have one or more Kafka consumers that read messages from the Kafka topic and perform actions based on the job details (e.g., execute a task, trigger an event, etc.).

### Kafka Topic

The Kafka topic `jobs-topic` is used to hold job messages. The topic must be created in the Kafka broker before jobs can be sent. You can manually create the topic or configure Kafka to create topics automatically.

---


## Troubleshooting

1. **Kafka Connection Issues**:
   - Make sure Kafka and Zookeeper are running. Check the Docker containers using `docker ps`.
   - Ensure that the Kafka broker is accessible at `localhost:9092` or adjust the configuration if using a remote broker.

2. **API Errors**:
   - Check the browser console and network logs for API request/response details.
   - Check the server logs for error messages related to Kafka connectivity or message production.

3. **Job Scheduling Not Triggering**:
   - Check if the `jobs-topic` exists in Kafka and the Kafka consumer is correctly processing messages.

---
