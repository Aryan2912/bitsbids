import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ip from "../ip";
const MyProductOffers = () => {
  let navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("active-user"));
  const [myOffers, setMyOffers] = useState([]);

  useEffect(() => {
    const getMyOffers = async () => {
      const offers = await retrieveMyOffers();
      if (offers) {
        setMyOffers(offers);
      }
    };

    getMyOffers();
  }, []);

  const retrieveMyOffers = async () => {
    const response = await axios.get(
      "http://"+ ip + ":8080/api/product/offer/fetch/user?userId=" + user.id
    );
    console.log(response.data);
    return response.data;
  };

  const deleteProductOffer = (offerId, e) => {
    const response = axios.delete(
      "http://"+ ip + ":8080/api/product/offer/id?offerId=" + offerId
    );

    console.log(response);
    toast.success(response.responseMessage, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setTimeout(() => {
      window.location.reload(true);
    }, 2000); // Redirect after 3 seconds
  };

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString(); // Adjust the format as needed

    return formattedDate;
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 custom-bg border-color p-0"
        style={{
          height: "45rem",
        }}
      >
        <div className="card-header text-center bg-color custom-bg-text">
          <h2>My Product Offers</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover custom-bg-text text-center">
              <thead className="bg-color table-bordered border-color">
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Offer Time</th>
                  <th scope="col">Offer Amount</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="text-color">
                {myOffers.map((myOffer) => {
                  return (
                    <tr>
                      <td>
                        <img
                          src={
                            "http://"+ ip + ":8080/api/product/" +
                            myOffer.product.imageName
                          }
                          class="img-fluid"
                          alt="product_pic"
                          style={{
                            maxWidth: "90px",
                          }}
                        />
                      </td>
                      <td>
                        <b>{myOffer.product.title}</b>
                      </td>
                      <td>
                        <b>{myOffer.product.description}</b>
                      </td>
                      <td>
                        <b>{formatDateFromEpoch(myOffer.dateTime)}</b>
                      </td>
                      <td>
                        <b>{myOffer.amount}</b>
                      </td>
                      <td>
                        {(() => {
                          if (myOffer.status === "Pending") {
                            return (
                              <button
                                className="btn bg-color custom-bg-text btn-sm"
                                onClick={() => deleteProductOffer(myOffer.id)}
                              >
                                Delete Offer
                              </button>
                            );
                          }
                        })()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProductOffers;
