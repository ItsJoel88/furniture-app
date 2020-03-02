import React from 'react';


export default function StyleFilter({ checkHandler, dropDownHandler, furnitureStyles }) {

    return (
        <div className="stylefilter">
            <div id="list1" className="dropdown-check-list" tabIndex="100">
                <span className="anchor" onClick={(evt) => dropDownHandler('items', 'underline1')}>Furniture Style</span>
                <div className="underline" id="underline1"></div>
                <ul id="items" className="items">
                    {
                        furnitureStyles ? furnitureStyles.map((style, index) => (
                            <div key={index} className="field-group" onClick={checkHandler}>
                                <li>{style}</li>
                                <input type="checkbox" className="check-box" value={style} />
                                <span className="customBox"></span>
                            </div>
                        )) : <p>Loading...</p>
                    }
                </ul>
            </div>
        </div>
    );
};