# Minecraft server-rcon

## Structure
![alt text](/src/assets/api-structure.png)

## Installation
>**Required**
>[Minecraft server-rcon-api](https://github.com/MrFermz/server-rcon-api)
>[Node.js >= 12.19.0](https://nodejs.org/en/download/)

>**Optional**
>[XAMPP >= 7.4.11](https://www.apachefriends.org/)

## Get started
### English

_**Note :** required start your API._

1. Open `Terminal` or `cmd` in directories to archive project.
2. Run `git clone https://github.com/MrFermz/server-rcon`
3. Edit config file in `src/environments/environment.deploy.ts`
    ``` json
    {
        "serverName": "Your server name",
        "api": {
            "host": "Your ip of API",
            "port": 7000
        }
    }
4. Save `environment.deploy.ts`
5. Run `cd server-rcon/` then `npm install`
7. Run `BUILD.sh` or `BUILD.bat` if in Windows.
8. Copy directories in `/dist` folder to your web server.
9. Have fun.

### ภาษาไทย
_**หมายเหตุ :** ต้องเปิด API ก่อนทุกครั้ง_

1. เปิด `Terminal` หรือ `cmd` ในโฟล์เดอร์ที่จะเก็บเว็บ
2. รันคำสั่ง `git clone https://github.com/MrFermz/server-rcon`
3. แก้ไขไฟล์เพื่อตั้งค่าเซิฟเวอร์ตัวเอง `src/environments/environment.deploy.ts`
    ``` json
    {
        "serverName": "ชื่อเซิฟเวอร์",
        "api": {
            "host": "IP ของ API",
            "port": 7000
        }
    }
4. บันทึกไฟล์ `environment.deploy.ts`
5. รันคำสั่ง `cd server-rcon/` `npm install`
7. รันไฟล์ `BUILD.sh` หรือ `BUILD.bat` ถ้าใช้ Windows
8. Copy ในโฟลเดอร์ `/dist` ไปที่ web server
9. เสร็จแล้ว
