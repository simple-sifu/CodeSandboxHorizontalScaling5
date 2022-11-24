import GetPublicBooksStub from "./GetPublicBooksStub";
import GetPrivateBooksStub from "./GetPrivateBooksStub";
import httpGateway from "../Shared/HttpGateway";
import booksRepository from "../Books/BooksRepository";
import Observable from "../Shared/Observable";
import BookListPresenter from "../Books/BookListPresenter";
import AddBooksPresenter from "../Books/AddBooksPresenter";

export default class BookAdderTestHarness {
  constructor() {
    this.addBookPresenter = new AddBooksPresenter();
    this.bookListPresenter = new BookListPresenter();
  }
  async init(callback) {
    jest.clearAllMocks();
    booksRepository.booksPm = new Observable([]);
    booksRepository.mode = "books";
    booksRepository.sort = null;
    httpGateway.post = jest.fn().mockImplementation(() => {});
    httpGateway.get = jest.fn().mockImplementation((path) => {
      if (path === "https://api.logicroom.co/api/pete@logicRoom.co/books") {
        return GetPrivateBooksStub();
      } else if (
        path === "https://api.logicroom.co/api/pete@logicRoom.co/allbooks"
      ) {
        return GetPublicBooksStub();
      }
    });
    await this.bookListPresenter.load(callback);
  }

  async addBook() {
    jest.clearAllMocks();

    var pivotedStub = GetPublicBooksStub();
    pivotedStub.result.push(pivotedStub.result[2]);
    httpGateway.post = jest.fn().mockImplementation(() => {});
    httpGateway.get = jest.fn().mockImplementation((path) => {
      return pivotedStub;
    });
    await this.addBookPresenter.addBook("UFT", "Pete Heard");
  }
}
