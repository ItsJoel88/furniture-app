export const FetchDataAPI = (setData, search) => async dispatch => {
    try {
        const response = await fetch('http://www.mocky.io/v2/5c9105cb330000112b649af8', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        let content = await response.json();
        let dataAPI;
        if (search !== '') {
            dataAPI = Object.assign({}, content, {
                products: content.products.filter((val, index) => val.name.toLowerCase().includes(search.toLowerCase()))
            });
        } else {
            dataAPI = content;
        }
        setData(dataAPI);
        await dispatch({ type: 'FETCH_SUCCESS', data: content });
        await dispatch({ type: 'FETCH_PENDING', status: false });
    } catch (err) {
        console.log(err)
        dispatch({ type: 'FETCH_PENDING', error: err });
    };
};
