# Virtual Radar & Logbook

Virtual Radar & Logbook adalah aplikasi web sederhana yang dibangun menggunakan **Django**, **React**, dan **WebSocket** untuk menampilkan data pesawat secara real-time dari **OpenSky Network** serta menyimpan riwayat penerbangan pesawat yang dipilih.

## Fitur

- Menampilkan 5–10 pesawat yang sedang terbang di wilayah Indonesia dan amerika.
- Pembaruan data secara *real-time* menggunakan WebSocket.
- Menampilkan informasi pesawat:
  - Callsign
  - ICAO24
  - Negara asal
  - Latitude & Longitude
  - Kecepatan
  - Ketinggian
- Menampilkan lokasi pesawat pada peta interaktif.
- Mengikuti (Follow) pesawat tertentu.
- Menyimpan riwayat penerbangan ke database.
- Menampilkan riwayat penerbangan yang telah direkam.

## Stack

### Backend
- Python
- Django
- Django Channels
- Daphne
- Requests

### Frontend

- React
- Vite
- Tailwind CSS
- Axios


### Database

- SQLite

### API

- OpenSky Network API

---

## Struktur Proyek

```

opensky-radar/
│
├── config/                  # Konfigurasi utama Django
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
├── frontend/                # Frontend React + Tailwind CSS
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── index.html
│
├── radar/                   # Logika aplikasi radar dan WebSocket
│   ├── migrations/
│   ├── templates/
│   ├── admin.py
│   ├── apps.py
│   ├── consumers.py
│   ├── models.py
│   ├── opensky.py
│   ├── services.py
│   ├── urls.py
│   └── views.py
│
├── .gitignore
├── credentials.json         # Kredensial OpenSky (lokal)
├── db.sqlite3               # Database SQLite
├── manage.py                # Menjalankan perintah Django
├── README.md                # Dokumentasi proyek
└── requirements.txt         # Dependensi Python
```
## 📋 Prasyarat

Sebelum menjalankan proyek, pastikan telah menginstal:

- Python 3.14.6 atau versi yang kompatibel dengan dependensi proyek
- Node.js dan npm
- Akun OpenSky Network beserta OAuth Client Credentials

---
## 🔑 Konfigurasi OpenSky

Buat file `credentials.json` pada direktori utama (root) proyek dengan format berikut:

```json
{
  "clientId": "opensky-client-id-anda",
  "clientSecret": "opensky-client-secret-anda"
}
```

> **Catatan:** File `credentials.json` telah ditambahkan ke `.gitignore`, sehingga tidak akan ikut terunggah ke repository GitHub.

## Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/iqbalmusyaffa/opensky-radar.git
cd virtual-radar-logbook
```
## Menjalankan Backend
---

### 2. Membuat Virtual Environment

```bash
python -m venv venv
```

Windows

```bash
venv\Scripts\activate
```

Linux/macOS

```bash
source venv/bin/activate
```

---

### 3. Install Dependency Backend

```bash
pip install -r requirements.txt
```

### 4. Konfigurasi OpenSky

Buat file `credentials.json`

```json
{
    "client_id": "CLIENT_ID",
    "client_secret": "CLIENT_SECRET"
}
```
---

### 5. Migrasi Database

```bash
python manage.py migrate
```
### 6. Jalankan Backend

```bash
python manage.py runserver
```
Backend berjalan di

```
http://127.0.0.1:8000
```

## Menjalankan Frontend

## Masuk ke folder frontend

```bash
cd frontend
```

## Install dependency

```bash
npm install
```

## Menjalankan server development.

```bash
npm run dev
```

## Menjalankan server production.

```bash
npm run build
```

Menjalankan hasil build (opsional).

```bash
npm run preview
```

## Frontend berjalan di

```
http://localhost:5173
```

---

## Endpoint API

| Endpoint | Method | Deskripsi |
|----------|--------|-----------|
| `/api/aircraft/` | GET | Mengambil daftar pesawat yang sedang terbang. |
| `/api/followed-aircraft/` | GET | Menampilkan daftar pesawat yang sedang diikuti. |
| `/api/follow-aircraft/` | POST | Menambahkan pesawat ke daftar yang diikuti. |
| `/api/logbook/` | GET | Menampilkan seluruh riwayat penerbangan yang tersimpan. |
| `/api/aircraft/<icao24>/history/` | GET | Menampilkan riwayat penerbangan berdasarkan ICAO24. |

# 📝 Catatan

- Data pesawat diperoleh dari OpenSky Network API.
- Koneksi internet diperlukan agar aplikasi dapat menerima pembaruan data secara real-time.
- Riwayat penerbangan disimpan menggunakan database SQLite.

---
