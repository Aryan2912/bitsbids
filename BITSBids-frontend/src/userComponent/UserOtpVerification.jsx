import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ip from "../ip";
const UserOtpVerification = () => {
  const location = useLocation();
  const userResponse = location.state;

  const navigate = useNavigate();

  const [user, setUser] = useState(userResponse);
  const [otp, setOtp] = useState("");

  const otpVerify = (e) => {
    e.preventDefault();
    fetch("http://"+ ip + ":8080/api/user/verify/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user,
        otp: otp,
      }),
    }).then((result) => {
      console.log("result", result);
      result.json().then((res) => {
        console.log(res);

        if (res.responseCode === 0) {
          console.log("Got the success response");

          toast.success(res.responseMessage, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setTimeout(() => {
            navigate("/user/login");
          }, 3000); // Redirect after 3 seconds
        } else if (res.responseCode === 1) {
          toast.error(res.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            navigate("/user/register");
          }, 3000); // Redirect after 3 seconds
        }
      });
    });
  };

  return (
    <div>
      <div class="mt-2 d-flex aligns-items-center justify-content-center">
        <div class="card form-card border-color" style={{ width: "25rem" }}>
          <div className="card-header bg-color custom-bg-text">
            <h5 class="card-title text-center">Payment Details</h5>
          </div>
          <div class="card-body text-color custom-bg">
            <form onSubmit={otpVerify}>
              <div class="mb-3">
                <label for="name" class="form-label">
                  <b>OTP</b>
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="otp"
                  name="otp"
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                  required
                />
              </div>

              <input
                type="submit"
                class="btn custom-bg-text bg-color"
                value="Verify"
              />

              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOtpVerification;
