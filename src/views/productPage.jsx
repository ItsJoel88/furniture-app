import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './productPage.css';

import { FetchDataAPI } from '../store/action';

import SearchBar from '../components/searchBar';
import StyleFilter from '../components/styleFilter';
import DeliveryFilter from '../components/deliveryFilter';
import Card from '../components/card';

export default function ProductPage({ }) {
    const dispatch = useDispatch();
    const [dataAPI, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [styleFilter, setStyle] = useState([]);

    useEffect(() => {
        dispatch(FetchDataAPI(setData, search));
    }, [])

    const checkHandler = (evt) => {
        let checkbox = evt.currentTarget.childNodes[1];
        if (checkbox.checked) {
            setStyle([
                ...styleFilter.filter((val) => val !== checkbox.value)
            ]);
            checkbox.checked = false;
        } else {
            setStyle([
                ...styleFilter, checkbox.value
            ]);
            checkbox.checked = true;
        }
    };

    const dropDownHandler = (id, underlineId) => {
        const items = document.getElementById(id);
        const underline = document.getElementById(underlineId);
        if (items.classList.contains('visible')) {
            items.classList.remove('visible');
            items.style.display = "none";
            underline.style.display = "block";
        } else {
            items.classList.add('visible');
            items.style.display = "block";
            underline.style.display = "none";
        };
    };

    const searchHandler = (e) => {
        setSearch(e.target.value)
    };

    const enterSearch = (e) => {
        if (e.key === 'Enter') {
            e.target.value = '';
            dispatch(FetchDataAPI(setData, search))
        };

        setSearch('');
    }

    return (
        <>
            <div className="header-page">
                <SearchBar searchHandler={searchHandler} enterSearch={enterSearch} />
                <div className="dropdown-filter">
                    <StyleFilter furnitureStyles={dataAPI.furniture_styles} checkHandler={checkHandler} dropDownHandler={dropDownHandler} />
                    <DeliveryFilter checkHandler={checkHandler} dropDownHandler={dropDownHandler} />
                </div>
            </div>
            <div className="body-page">
                <Card products={dataAPI.products} styleFilter={styleFilter} />
            </div>
        </>
    )

}