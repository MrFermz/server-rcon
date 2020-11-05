# Minecraft server-rcon

## Structure (Now website)
![alt text](/src/assets/api-structure.png)

## Installation
>**Required**
>[Minecraft server-rcon-api](https://github.com/MrFermz/server-rcon-api)
>[Node.js >= 12.19.0](https://nodejs.org/en/download/)

>**Optional**
>[XAMPP >= 7.4.11](https://www.apachefriends.org/)
>[Git bash >= 2.29.2](https://git-scm.com/downloads)

## Get started
### English

_**Note :** required start your API._

>**Windows**
`1. Download and unzip`

>**Linux**
`1. Open Terminal`
`2. git clone https://github.com/MrFermz/server-rcon`
3. Edit config file in `src/environments/environment.deploy.ts`
``` json
    {
        "serverName": "Your server name",
        "api": {
            "host": "Your ip of API",
            "port": 7000
        }
    }
```
4. Save `environment.deploy.ts`
5. Run `BUILD.sh` or `BUILD.bat` if in Windows.
6. Copy files in `/dist` to your web server.
7. Have fun.

### ภาษาไทย
_**หมายเหตุ :** ต้องเปิด API ก่อนทุกครั้ง_

>**Windows**
`1. โหลดมาแล้วแตกไฟล์`

>**Linux**
`1. เปิด Terminal`
`2. git clone https://github.com/MrFermz/server-rcon`
3. แก้ไขไฟล์เพื่อตั้งค่าเซิฟเวอร์ตัวเอง `src/environments/environment.deploy.ts`
``` json
    {
        "serverName": "ชื่อเซิฟเวอร์",
        "api": {
            "host": "ip ของ api",
            "port": 7000
        }
    }
```
4. บันทึก `environment.deploy.ts`
5. รันไฟล์ `BUILD.sh` หรือ `BUILD.bat` ถ้าใช้ Windows
6. คัดลอกไฟล์ใน `/dist` ไปใช้งานได้เลย
7. เสร็จแล้ว