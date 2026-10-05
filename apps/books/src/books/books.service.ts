import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookDto } from './dto/book.dto';

@Injectable()
export class BooksService {
  private books: BookDto[] = [
    {
      id: 1,
      title: "Book 1",
      author: "Author 1",
      rating: 4.5
    },
    {
      id: 2,
      title: "Book 2",
      author: "Author 2",
      rating: 4.5
    }
  ];

  create(createBookDto: CreateBookDto) {
    return 'This action adds a new book';
  }

  findAll() {
    return this.books;
  }

  findOne(id: number) {
    return this.books.find((b) => b.id === id) || `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
