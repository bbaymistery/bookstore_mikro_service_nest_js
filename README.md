# 📚 Bookstore Microservice

Proje kurulum adımları ve uygulanan prosedürler:

### 1. API Gateway Oluşturma (MonoRepo için)
```bash
npx @nestjs/cli@10 generate app bookstore-api-gateway
```

### 2. Users Mikroservisi Oluşturma
```bash
npx @nestjs/cli@10 generate app users
```

### 3. Books Mikroservisi Oluşturma
```bash
npx @nestjs/cli@10 generate app books
```

### 4. nest-cli.json Dosyasında API Gateway'i Varsayılan Proje Yapma
Uygulamanın varsayılan (ana) giriş noktasını `bookstore-api-gateway` olarak ayarlamak için `nest-cli.json` ayarları şu şekilde güncellenir:

```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "apps/bookstore-api-gateway/src",
  "compilerOptions": {
    "deleteOutDir": true,
    "webpack": true,
    "tsConfigPath": "apps/bookstore-api-gateway/tsconfig.app.json"
  },
  "monorepo": true,
  "root": "apps/bookstore-api-gateway",
  "defaultProject": "bookstore-api-gateway"
}
```

### 5. Mikroservis Paketinin Kurulması
```bash
npm install @nestjs/microservices
```


### 6. API Gateway İçinde Users Modülü Oluşturma (Mikroservis Bağlantısı)
API Gateway içinden Users mikroservisine erişim ve bağlantı sağlamak için `bookstore-api-gateway` projesi altına `users` modülü eklenir:

```bash
npx @nestjs/cli@10 generate module users --project bookstore-api-gateway
```

### 7. API Gateway İçinde Users Servisi Oluşturma (Add Users Service to Users Module)
API Gateway içerisindeki `users` modülünün mikroservis istemcisi ve iş mantığı katmanını yönetmesi için `users` servisi eklenir:

```bash
npx @nestjs/cli@10 generate service users --project bookstore-api-gateway
```

### 8. API Gateway İçinde Users Controller Oluşturma (Add Users Controller to Users Module)
API Gateway içerisindeki `users` modülünün dış dünyadan (HTTP istemcilerinden) gelen istekleri karşılayıp yönlendirmesi için `users` controller eklenir:

```bash
npx @nestjs/cli@10 generate controller users --project bookstore-api-gateway
```

### 9. Servisleri Geliştirme (Watch) Modunda Çalıştırma ve Mimari Mantığı

Her bir uygulamayı veya mikroservisi ayrı bir terminal sekmesinde aşağıdaki komutlarla başlatırız. `--watch` parametresi, koddaki değişiklikleri canlı olarak algılayıp servisinizi otomatik olarak yeniden başlatır (Live Reload).

#### 🏨 Otel Benzetmesi (Dış Dünya vs İç Servisler)
Düşünün ki büyük bir otel işletiyorsunuz:

1. **1️⃣ Dış Dünyaya Açık Kapı = API Gateway (`bookstore-api-gateway`)**
   * **Resepsiyon Masası (API Gateway):**
     * Müşteriler (web siteniz, mobil uygulamanız, tarayıcı veya Postman) otele geldiğinde doğrudan mutfağa veya muhasebe odasına giremez. Önce kapıdaki Resepsiyona (`http://localhost:3000`) başvurur.
     * **"Dış dünyaya açık" demek:** İnternetten, dışarıdaki kullanıcılardan gelen HTTP isteklerini (URL adresini) doğrudan kabul edebilen tek kapı demektir.

2. **2️⃣ Gerçek Mikroservisler = `users` ve `books`**
   * **Muhasebe Odası:** `users` Mikroservisi (Port `3001`)
   * **Mutfak:** `books` Mikroservisi (Port `3002`)
   * **Neden Dış Dünyaya Kapalıdırlar?**
     * Dışarıdaki bir müşteri doğrudan mutfağa girip "Bana yemek pişir" diyemez. Müşterinin mutfağın telefon numarasını bilmesine gerek yoktur.
     * Müşteri isteğini kapıdaki Resepsiyona (API Gateway) iletir. Resepsiyon arka planda iç telefon hattıyla (TCP protokolü ile) Mutfağa (`books`) veya Muhasebeye (`users`) haber verir.
     * İşi yapan, veriyi işleyen ve saklayan asıl mikroservisler `users` ve `books` uygulamalarıdır.

#### 📊 Özet Tablo: Projenizde Hangisi Ne Oluyor?

| Uygulama | Türü | Dış Dünyaya Açık mı? | Nasıl İletişim Kurar? | Görevi |
| :--- | :--- | :--- | :--- | :--- |
| **`bookstore-api-gateway`** | **API Gateway (Resepsiyon)** | **EVET** (Port 3000) | HTTP (`http://localhost:3000`) | Dışarıdan gelen istekleri karşılar, güvenlik kontrolü yapar ve mikroservislere yönlendirir. |
| **`users`** | **Mikroservis (Kullanıcı Departmanı)** | **HAYIR** (Dışarıya Kapalı) | TCP (İç Ağ Mesajlaşması - Port 3001) | Kullanıcı bilgilerini saklar, sorgular ve API Gateway'e yanıt döner. |
| **`books`** | **Mikroservis (Kitap Departmanı)** | **HAYIR** (Dışarıya Kapalı) | TCP (İç Ağ Mesajlaşması - Port 3002) | Kitap listesini, stok durumunu yönetir ve yanıt döner. |

#### 🚀 Servis Çalıştırma Komutları:

- **1️⃣ API Gateway Servisini Çalıştırma:**
  ```bash
  npx nest start bookstore-api-gateway --watch
  ```

- **2️⃣ Users Mikroservisini Çalıştırma:**
  ```bash
  npx nest start users --watch
  ```

- **3️⃣ Books Mikroservisini Çalıştırma:**
  ```bash
  npx nest start books --watch
  ```

---

### 10. VS Code Üzerinde İstek Testi Yapma (`users.http`)

`npx nest start bookstore-api-gateway --watch` komutu çalışırken, isteklerinizi tarayıcı veya Postman açmadan doğrudan VS Code içinde test etmek için `users.http` dosyası kullanılır:

```http
GET http://localhost:3000/users
```

* 🎯 **VS Code'da İsteği Tetiklemek ve Yanıtı Görmek (`Send Request`):**
  1. VS Code eklenti mağazasından **"REST Client"** (*Huachao Mao*) eklentisini yükleyin.
  2. `users.http` dosyasını açıp `GET http://localhost:3000/users` kodunun üzerindeki mavi **`Send Request`** butonuna tıklayın.
  3. Sağ tarafta açılan yanıt penceresinde aşağıdaki gibi `HTTP/1.1 200 OK` ve `mock findAll response` çıktısı görüntülenecektir:

```http
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 21
ETag: W/"15-dP7gheiKMFhif1URmHUsX3T9cqs"
Date: Mon, 05 Oct 2026 15:19:18 GMT
Connection: close

mock findAll response
```





