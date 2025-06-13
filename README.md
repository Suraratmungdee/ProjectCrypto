# ProjectCrypto



```
# สร้างไฟล์ `.env` ที่ root ของโปรเจกต์ และเพิ่มค่าดังนี้:
DB_HOST=
DB_PORT=
DB_USER=root
DB_PASSWORD=
DB_NAME=
NODE_ENV=development
PORT=3000

# สร้าง Database
- เปิด phpMyAdmin
- สร้างฐานข้อมูลใหม่ตามชื่อที่กำหนดใน DB_NAME

# ขั้นตอน Run Project
- npm install             # ติดตั้ง dependencies
- npm run migrate         # สร้างตารางในฐานข้อมูล
- npm run dev             # รันเซิร์ฟเวอร์


# การทดสอบระบบด้วย Postman
1. สร้างผู้ใช้ (Create User)
Endpoint: POST /api/createUsers

2. เข้าสู่ระบบ (Login)
Endpoint: POST /login

ใช้ token ที่ได้จาก response ใน Postman:
- ไปที่แท็บ Authorization
- เลือก Bearer Token
- วาง token ที่ได้จากขั้นตอน login
  
3. สร้างคำสั่งซื้อขาย (Create Order) หากคำสั่ง buy และ sell ตรงกัน ระบบจะจับคู่และทำการ Trade
Endpoint: POST /api/CreateOrder

# ฟีเจอร์เพิ่มเติม
- ฝาก/ถอน เงินหรือเหรียญ → ใช้ API ในโฟลเดอร์ Transactions
- กระเป๋าเงิน (Wallets) ของผู้ใช้ → ตรวจสอบยอดและเหรียญที่ถืออยู่
- ประวัติการเทรด (Trade History) ของผู้ใช้ → ตรวจสอบคำสั่งที่เคยดำเนินการ

# หมายเหตุ
- ตรวจสอบให้แน่ใจว่า MySQL/MariaDB ทำงานอยู่
- ใช้ Node.js เวอร์ชันที่รองรับ (แนะนำ ≥ 18.x)
- ใช้ Postman หรือเครื่องมือ API อื่นสำหรับทดสอบ endpoint


  
