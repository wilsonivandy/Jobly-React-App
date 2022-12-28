import React, { useContext, useState } from "react";
import "./JobCard.css";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import UserContext from "../auth/UserContext";

function JobCard({id, title, salary, equity, companyName}) {
    const {hasAppliedToJob, applyToJob} = useContext(UserContext);
    const [applied, setApplied] = useState();

    async function applyJob(evt) {
        if (hasAppliedToJob(id)) return;
        applyToJob(id);
        setApplied(true);
    }

    return (
        <Card className="my-2" outline style={{width: '22vw'}}>
          {/* <div className="JobCard card"> {applied}
            <div className="card-body"> */}
            <CardBody>
              <CardTitle tag="h5">
              {title} @ {companyName}
              </CardTitle>
              {salary && <div><small>Salary: {salary}</small></div>}
              {equity !== undefined && <div><small>Equity: {equity}</small></div>}
              <button
                  className="btn btn-default font-weight-bold text-uppercase float-right"
                  onClick={applyJob}
                  disabled={applied}
              >
                {applied ? "Applied" : "Apply"}
              </button>
            </CardBody>
            {/* </div>
          </div> */}
        </Card>
    )    
}

export default JobCard;

