import DashSidebar from '../../components/DashSidebar';

const index = () => {
  return (
    <div className="container">
      <div className="row mt-4">
        <DashSidebar />
        <div className="col-lg-9">
          <div className="shadow p-3 my-3 bg-white rounded p-3"></div>
        </div>
      </div>
    </div>
  );
};

export default index;
