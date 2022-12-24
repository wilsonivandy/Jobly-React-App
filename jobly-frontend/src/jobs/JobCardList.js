import React, {useState, useEffect} from 'react';
import JoblyApi from "../api";
import JobCard from './JobCard';

const JobCardList = ({ jobs }) => {
    return (
        <div >
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