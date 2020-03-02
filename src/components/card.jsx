import React from 'react';
import { useSelector } from 'react-redux';

function wordChecker(str) {
    return str.length > 114 ? str.substr(0, 115) : str;
};

function betweenDeliveryTime(delivery_time, timeFilter) {
    let minDays = timeFilter - 7;
    let maxDays = timeFilter;
    if (delivery_time >= minDays && delivery_time <= maxDays) {
        return true;
    }
    return false;
};

function filterProduct(products, style) {
    let productByStyle = [];
    let productByDelivery = [];
    let filteredProduct = [];

    style.forEach(val => {
        products.forEach(product => {
            if (product.furniture_style.indexOf(val) !== -1) {
                productByStyle.push(product);
            };
            if (+val && betweenDeliveryTime(+product.delivery_time, +val)) {
                productByDelivery.push(product);
            };

            if (val === 'more' && +product.delivery_time > 28) {
                productByDelivery.push(product);
            };
        });
    });
    if (productByStyle.length && productByDelivery.length) {
        for (let i = 0; i < productByStyle.length; i++) {
            for (let j = 0; j < productByDelivery.length; j++) {
                if (productByStyle[i].name === productByDelivery[j].name) {
                    filteredProduct.push(productByStyle[i]);
                }
            };
        };
    } else {
        filteredProduct = productByStyle.length ? [...new Set(productByStyle)] : [...new Set(productByDelivery)];
    }
    return filteredProduct;
};


const Card = ({ products, filterValue }) => {
    const pending = useSelector(state => state.pending);

    if (pending) {
        return (
            <img className="loading-img" src="https://1.bp.blogspot.com/-yIhXlQfYN1E/WMksG192LLI/AAAAAAAAA9w/txsqdQfykVksDEFshayeN54c0Gu6C3AAwCLcB/s400-c/glow.gif" alt="loading" />
        );
    } else if (products.length) {
        if (filterValue.length) {
            products = filterProduct(products, filterValue);
            if (!products.length) {
                return (
                    <img src="https://cdn.dribbble.com/users/721524/screenshots/4117132/untitled-1-_1_.png" alt="empty-product" className="empty-product" />
                )
            }
        }
        return (
            <div>
                {
                    products.map((product, index) => {
                        return (
                            <div key={index} className="card-template">
                                <div className="card-body">
                                    <div className="card-top">
                                        <div className="product-name">
                                            <p>{product.name}</p>
                                        </div>
                                        <div className="price">
                                            <p>Rp {product.price.toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <div className="card-middle">
                                        <p>
                                            {wordChecker(product.description)}
                                            <span className="more-description"> ...</span>
                                        </p>
                                    </div>
                                    <div className="card-bottom">
                                        <a href="#" id="furnitureStyles">{product.furniture_style.join(', ')}</a>
                                        <a href="#" id="deliveryDays">{product.delivery_time} Days</a>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    } else {
        return (
            <img src="https://cdn.dribbble.com/users/721524/screenshots/4117132/untitled-1-_1_.png" alt="empty-product" className="empty-product" />
        )
    }
};

export default Card;
