import { Inject, Injectable } from '@nestjs/common';
import {
  BOOK_PATTERNS,
  BookDto as ClientBookDto,
  CreateBookDto as ClientCreateBookDto,
  UpdateBookDto as ClientUpdateBookDto
} from '@app/contracts';
import { ClientProxy } from '@nestjs/microservices';

import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(@Inject('BOOKS_CLIENT') private readonly booksClient: ClientProxy) { }

  create(createBookDto: CreateBookDto) {
    return this.booksClient.send<ClientBookDto, ClientCreateBookDto>(
      BOOK_PATTERNS.CREATE,
      createBookDto
    );
  }

  findAll() {
    return this.booksClient.send<ClientBookDto[]>(BOOK_PATTERNS.FIND_ALL, {});
  }

  findOne(id: number) {
    return this.booksClient.send<ClientBookDto>(BOOK_PATTERNS.FIND_ONE, id);
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.booksClient.send<ClientBookDto, ClientUpdateBookDto>(
      BOOK_PATTERNS.UPDATE,
      { id, ...updateBookDto }
    );
  }

  remove(id: number) {
    return this.booksClient.send<ClientBookDto>(BOOK_PATTERNS.REMOVE, id);
  }
}
