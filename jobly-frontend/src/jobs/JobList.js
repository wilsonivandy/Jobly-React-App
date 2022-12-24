import React, {useState, useEffect} from 'react';
import JobCardList from './JobCardList'
import SearchForm from '../SearchForm';
import JoblyApi from "../api";

const JobList = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(function getCompaniesOnMount() {
        console.debug("CompanyList useEffect getCompaniesOnMount");
        search();
      }, []);

    async function search(title) {
        let res = await JoblyApi.getJobs(title)
        setJobs(res);
    }

    return (
        <div>
            <SearchForm search={search}/>
            {jobs.length
            ? <JobCardList jobs={jobs} />
            : <p className="lead">Sorry, no results were found!</p>
             }
        </div>
    )
}

export default JobList;