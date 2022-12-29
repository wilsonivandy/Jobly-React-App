import React, {useState, useEffect} from 'react';
import JobCard from './JobCard';
// import './JobCardList.css'

const JobCardList = ({ jobs }) => {
    return (
        <div className='JobCard'>
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