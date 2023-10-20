import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CompanyLst.css";
import { conApp } from "../../ContextAPI/ContextAPI";
import { ethers } from "ethers";

function CompanyLst() {
  const { constractDetails } = useContext(conApp);

  console.log(constractDetails);

  const companyData = [
    {
      name: "test",
      totalShare: "",
      availableShare: "",
      sharePrice: "",
    },
  ];

  const [data, setData] = useState(companyData);

  const getData = async () => {
    console.log("data");

    let transaction = await constractDetails.getAllCompanyShares();
    // let transaction = await ethers.getContract("FundMe", "0xE34136F2AC2  45E4De687a1FeAbc1D62460d0B811");

    //Fetch all the details of every NFT from the contract and display
    const items = await Promise.all(
      transaction.map(async (i) => {
        let item = {
          name: i.companyName,
          totalShare: i.totalShares,
          availableShare: i.availableShares,
          sharePrice: i.sharePrice,
        };
        return item;
      })
    );

    setData(items);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container ">
      <div className="heading">
        <h1 className="text-4xl py-5 px-5 font-sans font-bold">
          Company name's & shares
        </h1>
        <div className="lst">
          {data.map((company, i) => (
            <div className="company" key={i}>
              <div className="heading_company">
                <h1>{company.name}</h1>
              </div>
              <div className="price_stock">
                <h1>Rs.{company.sharePrice}</h1>
              </div>
              <button className="btn btn-primary">
                {" "}
                <Link to="/stock_exchange">Buy now</Link>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
// _companyName,
// uint256 _totalShares,
// uint256 _sharePrice
export default CompanyLst;
