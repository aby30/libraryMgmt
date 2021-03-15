
export const fetchService = async ({ fetchUrl, method = 'GET', reqData }) => {
    let fetchData = {};
    if (method !== 'GET') {
        fetchData = {
            method: method,
            body: reqData,
            headers: new Headers()
          }
    }

    fetch(fetchUrl, method !== 'GET' && fetchData).then(res => res.json())
        .then(response => {
            return response
        })
}