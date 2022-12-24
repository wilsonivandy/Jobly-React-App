import React, {useState, useEffect} from 'react';
import CompanyCard from './CompanyCard'
import SearchForm from '../SearchForm';
import JoblyApi from "../api";

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(function getCompaniesOnMount() {
        console.debug("CompanyList useEffect getCompaniesOnMount");
        search();
      }, []);

    async function search(name) {
        let companies = await JoblyApi.getCompanies(name)
        setCompanies(companies);
        console.log(companies);
    }

    return (
        <div>
            <SearchForm search={search}/>
            {companies.length
            ? (
                <div className="CompanyList-list">
                  {companies.map(c => (
                      <CompanyCard
                          key={c.handle}
                          handle={c.handle}
                          name={c.name}
                          description={c.description}
                          logoUrl={c.logoUrl}
                      />
                  ))}
                </div>
            ) : (
                <p className="lead">Sorry, no results were found!</p>
            )}

        </div>
    )
}

export default CompanyList;