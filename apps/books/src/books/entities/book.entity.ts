/**
 * ENTITY (Varlık / Veritabanı Modeli)
 * 
 * ENTITY vs DTO FARKILILIKLARI:
 * 
 * 1. Entity (Varlık):
 *    - Veritabanındaki (PostgreSQL, MongoDB vb.) tabloyu/koleksiyonu temsil eder.
 *    - Veritabanı sütunları (id, createdAt, password_hash vb.) ve veri kalıcılığı (Persistence) burada yönetilir.
 *    - Genellikle TypeORM, Prisma veya Mongoose decorator'ları (@Entity, @Column) ile süslenir.
 * 
 * 2. DTO (Data Transfer Object):
 *    - Dış dünyadan (Client / HTTP / Mikroservis mesajı) GÜVENLİ veri taşımak ve doğrulamak (Validation) için kullanılır.
 *    - Örn: Kayıt sırasında şifre DTO ile gelir, ancak veritabanına Entity içinde hash'lenerek kaydedilir.
 */
export class Book {
  id: number;
  title: string;
  author: string;
  price: number;
}

