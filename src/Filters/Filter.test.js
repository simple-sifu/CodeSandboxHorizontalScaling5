import httpGateway from "../Shared/HttpGateway";
import FilterPresenter from "../Filters/FilterPresenter";
import BookAdderTestHarness from "../TestTools/BookAdderTestHarness";

describe("filter book", () => {
  it("should load private books with sort asc", async () => {
    let filteredViewModel = null;
    new BookAdderTestHarness().init((generatedViewModel) => {
      filteredViewModel = generatedViewModel;
    });

    await new FilterPresenter().reloadWithMode("private");
    expect(httpGateway.get).toHaveBeenCalledWith(
      "https://api.logicroom.co/api/pete@logicRoom.co/books"
    );
    expect(filteredViewModel).toHaveLength(3);
    expect(filteredViewModel[0].name).toBe("Wind in the willows");
    expect(filteredViewModel[2].name).toBe("The Hobbit");

    // sort asc
    await new FilterPresenter().reloadWithSort("asc");
    expect(filteredViewModel).toHaveLength(3);
    expect(httpGateway.get).toHaveBeenCalledWith(
      "https://api.logicroom.co/api/pete@logicRoom.co/books"
    );
    expect(filteredViewModel[0].name).toBe("I, Robot");
    expect(filteredViewModel[2].name).toBe("Wind in the willows");
  });

  it("should load public books with sort desc", async () => {
    let filteredViewModel = null;
    new BookAdderTestHarness().init((generatedViewModel) => {
      filteredViewModel = generatedViewModel;
    });
    await new FilterPresenter().reloadWithMode("public");
    expect(httpGateway.get).toHaveBeenCalledWith(
      "https://api.logicroom.co/api/pete@logicRoom.co/allbooks"
    );
    expect(filteredViewModel).toHaveLength(5);
    expect(filteredViewModel[0].name).toBe("Moby Dick");
    expect(filteredViewModel[4].name).toBe("The Hobbit");

    // sort desc
    await new FilterPresenter().reloadWithSort("desc");
    expect(filteredViewModel).toHaveLength(5);
    expect(httpGateway.get).toHaveBeenCalledWith(
      "https://api.logicroom.co/api/pete@logicRoom.co/allbooks"
    );
    expect(filteredViewModel[0].name).toBe("Wind in the willows");
    expect(filteredViewModel[2].name).toBe("Sun Tzu");
  });
});
