import React, {useState, useEffect} from 'react';
import JobCardList from './JobCardList'
import SearchForm from '../common/SearchForm';
import JoblyApi from "../api";

const JobList = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(function getCompaniesOnMount() {
        console.debug("CompanyList useEffect getCompaniesOnMount");
        search();
      }, []);

    async function search(title) {
        console.log("searching")
        let res = await JoblyApi.getJobs(title)
        setJobs(res);
    }

    return (
        <div className='col-md-8 offset-md-2'>
            <SearchForm search={search} type="jobs"/>
            {jobs.length
            ? <JobCardList jobs={jobs} />
            : <p className="lead">Sorry, no results were found!</p>
             }
        </div>
    )
}

export default JobList;