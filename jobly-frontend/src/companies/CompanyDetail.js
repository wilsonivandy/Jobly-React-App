import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api";

const CompanyDetail = () => {
    const { handle } = useParams();
    const [company, setCompany] = useState(null)

    useEffect(function getDetail() {
        async function getCompany() {
          setCompany(await JoblyApi.getCompany(handle));
        }
    
        getCompany();
      }, [handle]);
    

    return (
        <div>
            <h4>{company.name}</h4>
            <p>{company.description}</p>
            {/* <JobCardList jobs={company.jobs} /> */}
        </div>

    )
}

export default CompanyDetail;