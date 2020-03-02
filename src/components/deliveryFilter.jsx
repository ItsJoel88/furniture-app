import React from 'react';


export default function DeliveryFilter({ checkHandler, dropDownHandler }) {

    return (
        <div className="deliveryfilter">
            <div id="list1" className="dropdown-check-list" tabIndex="100">
                <span className="anchor" onClick={(evt) => dropDownHandler('delivery', 'underline2')}>Delivery Time</span>
                <div className="underline" id="underline2"></div>
                <ul id="delivery" className="items">
                    <div className="field-group" onClick={checkHandler}>
                        <li>1 weeks</li>
                        <input type="checkbox" className="check-box" value='7' />
                        <span className="customBox"></span>
                    </div>
                    <div className="field-group" onClick={checkHandler}>
                        <li>2 weeks</li>
                        <input type="checkbox" className="check-box" value='14' />
                        <span className="customBox"></span>
                    </div>
                    <div className="field-group" onClick={checkHandler}>
                        <li>4 weeks</li>
                        <input type="checkbox" className="check-box" value='28' />
                        <span className="customBox"></span>
                    </div>
                    <div className="field-group" onClick={checkHandler}>
                        <li>More</li>
                        <input type="checkbox" className="check-box" value='more' />
                        <span className="customBox"></span>
                    </div>
                </ul>
            </div>
        </div>
    );
};