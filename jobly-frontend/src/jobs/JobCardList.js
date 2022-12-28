import React, {useState, useEffect} from 'react';
import JoblyApi from "../api";
import JobCard from './JobCard';
import './JobCardList.css'
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

const JobCardList = ({ jobs }) => {
    return (
        <div className='container'>
            {jobs.map(job => (
                   <JobCard
                    key={job.id}
                    id={job.id}
                    title={job.title}
                    salary={job.salary}
                    equity={job.equity}
                    companyName={job.companyName}
                    />
              ))}
        </div>
    )
}

export default JobCardList;