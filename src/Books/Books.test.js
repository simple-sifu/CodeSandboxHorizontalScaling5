import httpGateway from "../Shared/HttpGateway";
import BookAdderTestHarness from "../TestTools/BookAdderTestHarness";

describe("add book", () => {
  it("should call api", async () => {
    let bookAdderTestHarness = new BookAdderTestHarness();
    await bookAdderTestHarness.addBook(() => {});

    expect(httpGateway.post).toBeCalledWith(
      "https://api.logicroom.co/api/pete@logicRoom.co/books",
      {
        name: "UFT",
        author: "Pete Heard",
        ownerId: "pete@logicRoom.co"
      }
    );
  });
  it("should load(anchor) and reload books", async () => {
    // anchor
    let bookListViewModel = null;
    let bookAdderTestHarness = new BookAdderTestHarness();
    await bookAdderTestHarness.init((generatedBooksView) => {
      bookListViewModel = generatedBooksView;
    });
    expect(httpGateway.get).toHaveBeenCalledWith(
      "https://api.logicroom.co/api/pete@logicRoom.co/books"
    );
    expect(bookListViewModel).toHaveLength(3);
    expect(bookListViewModel[0].name).toBe("Wind in the willows");
    expect(bookListViewModel[2].name).toBe("The Hobbit");

    // pivot
    await bookAdderTestHarness.addBook();

    expect(
      httpGateway.post
    ).toHaveBeenCalledWith(
      "https://api.logicroom.co/api/pete@logicRoom.co/books",
      { author: "Pete Heard", name: "UFT", ownerId: "pete@logicRoom.co" }
    );
    expect(bookListViewModel).toHaveLength(6);
    expect(bookListViewModel[0].name).toBe("Moby Dick");
    expect(bookListViewModel[5].name).toBe("Wind in the willows");
  });
});
