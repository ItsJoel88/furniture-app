import React from 'react';
import { useSelector } from 'react-redux';

function wordChecker(str) {
    return str.length > 114 ? str.substr(0, 115) : str;
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
            if (+val && +product.delivery_time <= +val) {
                productByDelivery.push(product)
            }
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
    // if (filterByStyle.length > 0 && filterByDelivery.length > 0) {
    //     if (filterByStyle.length > filterByDelivery.length) {
    //         return filterByStyle.filter((value, index) => {
    //             if (filterByDelivery[index]) {
    //                 return filterByDelivery[index].name === value.name
    //             }
    //         });
    //     } else {
    //         console.log(filterByDelivery, '======')
    //         console.log(filterByStyle, '=====')
    //         return filterByDelivery.filter((value, index) => {
    //             if (filterByStyle[index]) {
    //                 return filterByStyle[index].name === value.name
    //             }
    //         });
    //     };
    // } else {
    //     return filterByStyle.length ? [...new Set(filterByStyle)] : [...new Set(filterByDelivery)];
    // };
};


const Card = ({ products, styleFilter }) => {
    const pending = useSelector(state => state.pending);

    if (pending) {
        return (
            <img className="loading-img" src="https://1.bp.blogspot.com/-yIhXlQfYN1E/WMksG192LLI/AAAAAAAAA9w/txsqdQfykVksDEFshayeN54c0Gu6C3AAwCLcB/s400-c/glow.gif" alt="loading" />
        );
    } else if (products.length > 0) {
        if (styleFilter.length) {
            products = filterProduct(products, styleFilter);
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
            <p>kosong...</p>
        );
    };
};

export default Card;
