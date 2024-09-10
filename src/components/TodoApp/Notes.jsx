import React from "react";

export default function Notes({
  notes,
  handleAddNote,
  handleRemoveNote,
  handleEditNote,
  currentNote,
  setCurrentNote,
  editingIndex,
  setEditingIndex,
  handleCheckboxChange,
}) {
  return (
    <div>
      <section className="vh-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card" id="list1">
                <div className="card-body py-4 px-4 px-md-5">
                  <p className="h1 text-center mt-3 mb-4 pb-3 text-dark">
                    <i className="fas fa-check-square me-1"></i>
                    <u>My Todo-s</u>
                  </p>

                  <div className="pb-2">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex flex-row align-items-center">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            value={currentNote}
                            onChange={(e) => setCurrentNote(e.target.value)}
                            placeholder="Add new..."
                          />
                          <a
                            href="#!"
                            data-mdb-tooltip-init
                            title="Set due date"
                          >
                            <i className="fas fa-calendar-alt fa-lg ms-3 me-3 text-dark"></i>
                          </a>
                          <div>
                            <button
                              type="button"
                              data-mdb-button-init
                              data-mdb-ripple-init
                              className="btn btn-dark"
                              onClick={handleAddNote}
                            >
                              {editingIndex !== null ? "Update" : "Add"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr className="my-4" />

                  <div className="d-flex justify-content-end align-items-center mb-4 pt-2 pb-3">
                    <p className="small mb-0 me-2 text-muted">Filter</p>
                    <select data-mdb-select-init>
                      <option value="1">All</option>
                      <option value="2">Completed</option>
                      <option value="3">Not Completed</option>
                    </select>
                    <p className="small mb-0 ms-4 me-2 text-muted">Sort</p>
                    <select data-mdb-select-init>
                      <option value="1">Added date</option>
                      <option value="2">Due date</option>
                    </select>
                    <a href="#!" data-mdb-tooltip-init title="Ascending">
                      <i className="fas fa-sort-amount-down-alt ms-2 text-dark"></i>
                    </a>
                  </div>

                  <ul className="list-group d-flex rounded-0 bg-transparent">
                    {notes.map((note, index) => (
                      <li
                        key={index}
                        className="list-group-item d-flex align-items-center w-100 ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent"
                      >
                        <div className="form-check">
                          <input
                            className="form-check-input me-0"
                            type="checkbox"
                            checked={note.checkbox}
                            id={`flexCheckChecked${index}`}
                            aria-label="..."
                            onClick={() => handleCheckboxChange(index)}
                          />
                        </div>
                        <div className="px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                          <p className="lead fw-normal mb-0">{note.note}</p>
                        </div>
                        <div className="ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
                          <div className="d-flex flex-row justify-content-end mb-1">
                            <a
                              href="#!"
                              className="text-info"
                              data-mdb-tooltip-init
                              title="Edit todo"
                              onClick={() => handleEditNote(index)}
                            >
                              <i className="fas fa-pencil-alt me-3"></i>
                            </a>
                            <a
                              href="#!"
                              className="text-danger"
                              data-mdb-tooltip-init
                              title="Delete todo"
                              onClick={() => handleRemoveNote(index)}
                            >
                              <i className="fas fa-trash-alt"></i>
                            </a>
                          </div>
                          <div className="text-end text-muted">
                            <a
                              href="#!"
                              className="text-muted"
                              data-mdb-tooltip-init
                              title="Created date"
                            >
                              <p className="small mb-0">
                                <i className="fas fa-info-circle me-2"></i>
                                {note.date}
                              </p>
                            </a>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
