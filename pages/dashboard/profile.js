/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import { useRef, useState } from 'react';
import DashSidebar from '../../components/DashSidebar';
import { GET_PROFILE, POST_PROFILE } from '../../utils/constants';

const Profile = ({ profile }) => {
  const [name, setName] = useState(profile.name);
  const [image, setImage] = useState(null);
  const [alertMsg, setAlertMsg] = useState({
    type: null,
    message: null,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setAlertMsg({});

    const data = new FormData();
    data.append('name', name);

    if (image) data.append('image', image);

    const res = await axios.post(POST_PROFILE, data, {
      withCredentials: true,
    });

    const { success, message } = res.data;

    success && setAlertMsg({ type: 'alert-primary', message: message });
    !success && setAlertMsg({ type: 'alert-danger', message: message });
  }

  const img_select = useRef(null);

  return (
    <div className="container">
      <div className="row mt-4">
        <DashSidebar />
        <div className="col-lg-9">
          <div className="shadow p-3 my-3 bg-white rounded p-3">
            <h3 className="p-2">My Profile</h3>

            {alertMsg.message && (
              <div className={`alert ${alertMsg.type}`} role="alert">
                {alertMsg.message}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-3 d-flex flex-column">
                  <img
                    data-testid="profilepic"
                    src={
                      (image && URL.createObjectURL(image)) ||
                      profile.image ||
                      `/uploads/profile/no_image.jpg`
                    }
                    className="rounded-circle mb-3 d-flex mx-auto align-self-center"
                    width="150px;"
                    alt="Avatar"
                  />
                  <input
                    type="file"
                    className="d-none"
                    ref={img_select}
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <div
                    className="btn btn-dark mx-3"
                    onClick={() => img_select.current.click()}
                    data-testid="upload"
                  >
                    Select Picture
                  </div>
                  <div
                    className="btn mx-3"
                    onClick={() => setImage(null)}
                    data-testid="reset"
                  >
                    Reset
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="my-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      data-testid="namefield"
                      className="form-control"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <input
                      type="email"
                      data-testid="emailfield"
                      className="form-control"
                      value={profile.email}
                      disabled
                    />
                  </div>

                  <div className="my-3">
                    <button
                      type="submit"
                      className="btn btn-primary mb-3"
                      data-testid="submitbtn"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

export async function getServerSideProps({ req }) {
  const res = await axios.get(GET_PROFILE, {
    headers: {
      Cookie: req.headers.cookie,
    },
    withCredentials: true,
  });
  const data = res.data.data;

  return { props: { profile: data } };
}
