import React, { useContext, useState } from "react";
import "./Addcompany.css";
import { conApp } from "../../ContextAPI/ContextAPI";

function AddCompany() {
  const { userAdd, setUserAdd, constractDetails, setConstractDetails } =
    useContext(conApp);

  const [company_name, setCompany_name] = useState("");
  const [toatalShares, settoatalShares] = useState("");
  const [sharePrice, setsharePrice] = useState("");

  const handleRegister = async () => {
    try {
      let transaction = await constractDetails.createShare(
        company_name,
        toatalShares,
        sharePrice
      );

      await transaction.wait();
      console.log("Listed com[pany succedsssfuly");
    } catch (error) {
      console.log("Error while listing company");
    }
  };

  return (
    <div>
      <section
        className="section__height d-flex align-items-center justify-content-center"
        id="contact"
      >
        <div className="container1 container">
          <div className="contact__container">
            <form>
              <div className="mb-3 pt-2 d-flex text-align-center align-items-center">
                <label htmlhtmlFor="name">
                  <i className="zmdi zmdi-store">Company Name :</i>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationDefault01"
                  name="name"
                  placeholder="Enter company Name"
                  onChange={(e) => {
                    setCompany_name(e.target.value);
                  }}
                  required
                />
              </div>
              <hr />
              <div className="mb-3 pt-2 d-flex text-align-center align-items-center">
                <label htmlhtmlFor="name">
                  <i className="zmdi zmdi-store">Total number of shares : </i>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationDefault01"
                  name="totalshares"
                  placeholder="Enter number of shares"
                  onChange={(e) => {
                    settoatalShares(e.target.value);
                  }}
                  required
                />
              </div>
              <hr />
              <div className="mb-3 pt-2 d-flex text-align-center align-items-center">
                <label htmlhtmlFor="name">
                  <i className="zmdi zmdi-store">Enter each share price : </i>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationDefault01"
                  name="shareprice"
                  placeholder="Enter Share Price"
                  onChange={(e) => {
                    setsharePrice(e.target.value);
                  }}
                  required
                />
              </div>
              <hr />
              <div className="col-12 pt-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="invalidCheck2"
                    style={{ border: "1px solid grey" }}
                    required
                  />
                  <label
                    className="form-check-label"
                    htmlhtmlFor="invalidCheck2"
                  >
                    Agree to terms and conditions
                  </label>
                </div>
              </div>
              <div className="d-grid pb-3  d-md-block">
                <button
                  className="btn btn-outline-danger  p-2   rounded"
                  id="button"
                  type="submit"
                  value="Submit"
                  role="button"
                  onClick={handleRegister}
                >
                  List the Company
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddCompany;
