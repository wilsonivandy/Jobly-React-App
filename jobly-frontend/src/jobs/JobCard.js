import React, { useContext, useState } from "react";
// import "./JobCard.css";
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
        <div className="JobCard card"> {applied}
        <div className="card-body">
          <h6 className="card-title">{title}</h6>
          <p>{companyName}</p>
          {salary && <div><small>Salary: {salary}</small></div>}
          {equity !== undefined && <div><small>Equity: {equity}</small></div>}
          <button
              className="btn btn-danger font-weight-bold text-uppercase float-right"
              onClick={applyJob}
              disabled={applied}
          >
            {applied ? "Applied" : "Apply"}
          </button>
        </div>
      </div>
    )    
}

export default JobCard;


// (
//   <section>
//     <Card>
//       <CardBody>
//         <CardTitle className="font-weight-bold text-center">
//           {item.name}
//         </CardTitle>
//         <CardText className="font-italic">{item.description}</CardText>
//         <p>
//           <b>Recipe:</b> {item.recipe}
//         </p>
//         <p>
//           <b>Serve:</b> {item.serve}
//         </p>
//       </CardBody>
//     </Card>
//   </section>
// );