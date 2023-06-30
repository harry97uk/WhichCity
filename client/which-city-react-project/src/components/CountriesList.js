import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function CountriesList() {
    const apiUrl = 'http://localhost:8000/api/countries';
    const apiOptions = {
        params: {
            continentID: window.location.href.split("/").slice(-2)[1]
        }
    }

    const [countries, setCountries] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        axios.get(apiUrl, apiOptions)
            .then(response => {
                setCountries(response.data._links['country:items'])
                setLoading(false)
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    if (loading) return "Loading..."

    return (
        <>
            <div>
                Countries
            </div>
            <div>
                {countries.map(c => (
                    <ListItemButton key={c.name} component={Link} to={"/dashboard/country/" + c.href.split("/").slice(-2)[0]}>
                        <ListItemText primary={c.name} />
                    </ListItemButton>
                ))}
            </div>
        </>
    )
}