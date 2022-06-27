import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import DashSidebar from '../../components/DashSidebar';
import { DELETE_CAT, GET_CAT, POST_CAT, PUT_CAT } from '../../utils/constants';

const Category = ({ category = [] }) => {
  const [addNewCat, setAddNewCat] = useState('');
  const [toggleEdit, setToggleEdit] = useState('');
  const [editVal, setEditVal] = useState('');
  const router = useRouter();

  async function handleAddCategory(e) {
    e.preventDefault();

    const response = await axios.post(
      POST_CAT,
      { title: addNewCat },
      { withCredentials: true }
    );

    setAddNewCat('');
    refreshData();
  }

  async function handleUpdate(e, id) {
    e.preventDefault();

    await axios.put(
      `${PUT_CAT}/${id}`,
      { title: editVal },
      { withCredentials: true }
    );

    setToggleEdit('');
    setEditVal('');
    refreshData();
  }

  async function handleDelete(id) {
    const response = await axios.delete(`${DELETE_CAT}/${id}`, {
      withCredentials: true,
    });

    refreshData();
  }

  const refreshData = () => {
    router.replace(router.asPath);
  };

  return (
    <div className="container">
      <div className="row mt-4">
        <DashSidebar />
        <div className="col-lg-9">
          <div className="shadow p-3 my-3 bg-white rounded p-5">
            <h3>Available Category</h3>

            <ul className="list-group my-3">
              {category.map(({ title, slug, _id }) => {
                return (
                  <li
                    className="px-3 list-group-item d-flex justify-content-between align-items-center"
                    key={slug}
                    data-testid="list_item"
                  >
                    {toggleEdit === _id ? (
                      <>
                        <form
                          className="d-flex w-100 py-2"
                          onSubmit={(e) => handleUpdate(e, _id)}
                          data-testid="editform"
                        >
                          <div className="col-9">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Categroy Name"
                              required
                              value={editVal}
                              onChange={(e) => setEditVal(e.target.value)}
                              maxLength={30}
                              data-testid="inputform"
                            />
                          </div>

                          <div className="col-3">
                            <button
                              type="submit"
                              className="btn btn-success ms-2"
                              data-testid="updatebtn"
                            >
                              Update
                            </button>
                            <button
                              type="button"
                              className="btn btn-dark ms-2"
                              data-testid="cancelbtn"
                              onClick={() => {
                                setToggleEdit('');
                                setEditVal('');
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </>
                    ) : (
                      <>
                        <div data-testid="list_title">{title}</div>
                        <div className="d-flex">
                          <button
                            type="button"
                            className="btn btn-warning me-2 d-flex"
                            data-testid="list_edit_btn"
                            onClick={() => {
                              setToggleEdit(_id);
                              setEditVal(title);
                            }}
                          >
                            <i className="ri-pencil-line me-2"></i>
                            Edit
                          </button>
                          <button
                            type="button"
                            data-testid="list_delete_btn"
                            className="btn btn-danger me-2"
                            onClick={() => handleDelete(_id)}
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>

            <form className="d-flex" onSubmit={handleAddCategory}>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Categroy Name"
                  required
                  value={addNewCat}
                  onChange={(e) => setAddNewCat(e.target.value)}
                  maxLength={30}
                  data-testid="addcategory_field"
                />
              </div>

              <div className="col-4">
                <button
                  type="submit"
                  className="btn btn-primary ms-2"
                  data-testid="addCatBtn"
                >
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;

export async function getServerSideProps() {
  const res = await axios.get(GET_CAT, { withCredentials: true });
  const data = res.data.data;

  return { props: { category: data } };
}
