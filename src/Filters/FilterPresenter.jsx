import booksRepository from "../Books/BooksRepository.js";

export default class FilterPresenter {
  reloadWithMode = async (modeArg) => {
    await booksRepository.setMode(modeArg);
    await booksRepository.loadApiData();
  };
  reloadWithSort = async (sortArg) => {
    await booksRepository.setSort(sortArg);
    await booksRepository.loadApiData();
  };
}
