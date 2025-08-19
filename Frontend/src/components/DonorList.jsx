import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

function DonorList() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchDonors = async () => {
    setLoading(true);
    await axios.get('/api/user/search')
      .then(res => {
        setDonors(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching donors:', err);
        setLoading(false);
      });
  };


  const handleLogout = async (res) => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;
    try {
      const res = await axios.post("/api/user/logout");
      sessionStorage.removeItem("Blood Donor");
      toast.success("Log out successfully..");
      window.location.reload();
    }
    catch (error) {
      console.log("Error in Logout", error);
      toast.error("Error in logging out");
    }
  };
  return (
    <>
      <div className="w-full h-screen">

        <div onClick={handleLogout} className="bg-red-600 fixed  top-3 right-5 rounded-md p-1 font-bold cursor-pointer text-white text-xl"> Log Out </div>
        <h1 className="bg-gradient-to-r from-[#CB0404] via-[#C562AF] to-[#FE5D26] text-white  fixed top-15 left-5  rounded-xl p-2 font-bold text-2xl md:text-4xl  ">Blood Donor List</h1>
        <button className='mt-30 text-center rounded-xl cursor-pointer text-2xl text-white bg-blue-500 py-2 p-5' onClick={fetchDonors}>Search Donors..</button>
        {!loading && donors.length > 0 && (
          <div style={{ minWidth: "100%" }} className=' w-full h-auto' >
            <div style={{ maxWidth: "100%" }} className=' flex justify-center items-center gap-2 flex-col overflow-x-auto'>
              {donors.map((donor, index) => (
                <div className="rounded-xl bg-[#fee68582]  p-5 text-md " key={index}>
                  <div className="">
                  <span className=' font-bold text-xl py-2'>{donor.fullname}</span>
                  </div>
                  <span className=' font-extrabold px-5 py-2'>{donor.bloodGroup}</span>
                  <span className=' px-5 py-2'>{donor.city}</span>
                  <span className=' px-5 py-2'>{donor.gender}</span>
                </div>
              ))}

            </div>
          </div>
        )}
        {!loading && donors.length === 0 && <p>No donors found.</p>}
      </div>
    </>
  )
}

export default DonorList