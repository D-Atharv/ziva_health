# Event Management System – CR1

A simplified Event Management System that allows users to register, create events, manage registrations, and enforce event capacity limits.


## 🛠️ Setup Instructions

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd <project-folder>
````

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

In the root folder, create a `.env` file with the following content:

```env
DATABASE_URL="*"
PORT=5000
JWT_SECRET="*"
```

> Make sure the `DATABASE_URL` matches your CockroachDB credentials.

### 4. Push Prisma schema to the database

```bash
npx prisma db push
```

> This will create the tables defined in your `schema.prisma` without using migrations.

### 5. Start the server

```bash
npm run dev
```

The API will be running at:

```
http://localhost:5000
```

---

## 📚 API Documentation

### **Authentication**

| Method | Endpoint             | Description              | Body                                                                        |
| ------ | -------------------- | ------------------------ | --------------------------------------------------------------------------- |
| POST   | `/api/auth/register` | Register a new user      | `{ "name": "John Doe", "email": "john@example.com", "password": "123456" }` |
| POST   | `/api/auth/login`    | Login user               | `{ "email": "john@example.com", "password": "123456" }`                     |
| POST   | `/api/auth/logout`   | Logout user              | None                                                                        |
| GET    | `/api/auth/me`       | Get current user profile | Requires Authorization header or token cookie                               |

---

### **Events**

| Method | Endpoint          | Description                                    | Body                                                                                                                                             |
| ------ | ----------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| POST   | `/api/events`     | Create a new event (auth only)                 | `{ "title": "Event Name", "description": "Event description", "dateTime": "2025-09-21T10:00:00Z", "location": "City Hall", "maxCapacity": 100 }` |
| GET    | `/api/events`     | List all upcoming events                       | None                                                                                                                                             |
| GET    | `/api/events/:id` | Get event details including registration count | None                                                                                                                                             |
| PUT    | `/api/events/:id` | Update event (auth only, creator)              | Partial update `{ title?, description?, dateTime?, location?, maxCapacity? }`                                                                    |
| DELETE | `/api/events/:id` | Delete event (auth only, creator)              | None                                                                                                                                             |

---

### **User Registration**

| Method | Endpoint                       | Description                  | Body |
| ------ | ------------------------------ | ---------------------------- | ---- |
| POST   | `/api/events/:id/register`     | Register for an event (auth) | None |
| DELETE | `/api/events/:id/register`     | Cancel registration (auth)   | None |
| GET    | `/api/users/:id/registrations` | Get all user registrations   | None |

---

## 🏗️ Architecture Notes

1. **Backend**

   * **Node.js + Express** – main server and routing.
   * **Prisma ORM** – database access for PostgreSQL / CockroachDB.
   * **CockroachDB** – distributed SQL database.
   * **JWT-based authentication** – secure endpoints.
   * **bcrypt** – password hashing.
   * **Joi** – input validation for all requests.
   * **Cookie-based token storage** – secure storage of JWT tokens.
   * **CORS** – configured for multiple allowed frontend origins.

2. **Database Design**

   * **User**

     * `id` – primary key
     * `name`
     * `email` – unique
     * `password` – hashed
     * `createdAt` – default timestamp
   * **Event**

     * `id` – primary key
     * `title` – unique
     * `description`
     * `dateTime`
     * `location`
     * `maxCapacity`
     * `createdBy` – foreign key (user)
     * `createdAt` – default timestamp
   * **Registration**

     * `id` – primary key
     * `userId` – foreign key (user)
     * `eventId` – foreign key (event)
     * `status` – default "registered"
     * `registrationDate` – default timestamp

3. **Key Features**

   * Event capacity limits enforced.
   * Prevent users from registering for the same event twice.
   * Only event creators can update or delete events.
   * Input validation with meaningful error messages.
   * Atomic registration transactions prevent race conditions.

---

## ⚡ Notes

* Focused on backend API; frontend can consume endpoints via any framework (React, Next.js, etc.).
* Handles concurrent registrations safely.
* Includes authentication, authorization, and error handling.

---

## 📝 Deliverables

1. Fully working backend API.
2. Setup instructions as above.
3. API documentation for all endpoints.
4. Database schema using Prisma with `db push`.
5. Brief architecture notes.

```

This version is **ready to copy-paste**, fully detailed, and uses **`prisma db push`** instead of migrations.  
```
