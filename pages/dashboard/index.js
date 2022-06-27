import DashSidebar from '../../components/DashSidebar';

const index = () => {
  return (
    <div className="container">
      <div className="row mt-4">
        <DashSidebar />
        <div className="col-lg-9">
          <div className="shadow p-3 my-3 bg-white rounded p-5">
            <p>Please, Select one of the option on the menu</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
