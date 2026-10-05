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


