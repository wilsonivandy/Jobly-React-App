import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { useParams } from "react-router-dom";
import JoblyApi from "../api";
import JobCardList from "../jobs/JobCardList";

const CompanyDetail = () => {
    const { handle } = useParams();
    const [company, setCompany] = useState(null)

    useEffect(function getDetail() {
        async function getCompany() {
          setCompany(await JoblyApi.getCompany(handle));
        }
    
        getCompany();
      }, [handle]);

    const renderCompany = () => {
      if (company) {
        return (
          <div>
            <h4>{company.name}</h4>
            <p>{company.description}</p>
            <JobCardList jobs={company.jobs} />
          </div>
        )
      }
    }

    return (
      <div>
        {renderCompany()}
      </div>
    )
}

export default CompanyDetail;