import {useState} from "react";
import {ToastContainer} from "react-toastify";

const AdminProfile = () => {
    const user = JSON.parse(sessionStorage.getItem("active-admin"));
    console.log(user);
    const firstName = useState(user.firstName);
    const lastName = useState(user.lastName);
    const role = useState(user.role);
    const phoneNo = useState(user.phoneNo);
    const street = useState(user.address.street);
    const city = useState(user.address.city);
    const pincode = useState(user.address.pincode);
    return(
        <div>


                <div className="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2 ">
                    <div
                        className="card form-card border-color text-color custom-bg p-0"
                        style={{ width: "25rem" }}
                    >
                        <div className="card-header bg-color custom-bg-text text-center">
                            <h5 className="card-title">My Profile</h5>
                        </div>
                        <div className="card-body">
                            <div className="mb-3 text-color">
                                <b>First Name</b> - {firstName}
                            </div>
                            <div className="mb-3 text-color">
                                <b>Last Name</b> - {lastName}
                            </div>
                            <div className="mb-3 text-color">
                                <b>Role</b> - Seller
                            </div>
                            <div className="mb-3 text-color">
                                <b>Phone Number</b> - {phoneNo}
                            </div>
                            <div className="mb-3 text-color">
                                <b>ID Number</b> - {street}
                            </div>
                            <div className="mb-3 text-color">
                                <b>Hostel Name & Room Number</b> - {city}
                            </div>
                            <div className="mb-3 text-color">
                                <b>ERP ID</b> - {pincode}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

    );
}

export default AdminProfile;