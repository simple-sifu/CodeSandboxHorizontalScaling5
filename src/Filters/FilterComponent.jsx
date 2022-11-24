import React from "react";
import FilterPresenter from "./FilterPresenter";
import "./Filter.css";

export default function FilterComponent() {
  let filterPresenter = new FilterPresenter();

  return (
    <div>
      <h5>Filter Book (api)</h5>
      <button
        onClick={() => {
          filterPresenter.reloadWithMode("public");
        }}
      >
        Public Books
      </button>
      <button
        onClick={() => {
          filterPresenter.reloadWithMode("private");
        }}
      >
        Private Books
      </button>
      <div>
        <button
          onClick={() => {
            filterPresenter.reloadWithSort("desc");
          }}
        >
          Sort Desc
        </button>
        <button
          onClick={() => {
            filterPresenter.reloadWithSort("asc");
          }}
        >
          Sort Asc
        </button>
      </div>
    </div>
  );
}
