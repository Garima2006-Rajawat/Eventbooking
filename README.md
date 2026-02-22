## ⚙ Setup Instructions

### 1. Clone Repository
```bash
git clone <your_repo_url>
cd event-booking-system
```

---

### 2. Setup Backend
```bash
cd server
npm install
```

Create a `.env` file inside `/server`:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=event_booking
```

Run backend:
```bash
npm start
```

---

### 3. Setup Database (MySQL)

- Create database:
```sql
CREATE DATABASE event_booking;
```

- Import schema:
```bash
mysql -u root -p event_booking < event_booking.sql
```

---

### 4. Setup Frontend
```bash
cd client
npm install
npm start
```

Frontend runs at:
```
http://localhost:3000
```

Backend runs at:
```
http://localhost:5000
```

---

### 5. Admin Dashboard Access

```
Route: /admin
Example: http://localhost:3000/admin
```

---

### 6. Real-time Features

- Socket.IO automatically enables:
  - Real-time seat availability
  - Seat locking during checkout