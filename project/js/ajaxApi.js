(function (window) {
    let ajax = {};

    ajax.get = async function (requestUrl, responseHandler, isJsonResponse = true) {
        try {
            const response = await fetch(requestUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = isJsonResponse ? await response.json() : await response.text();
            responseHandler(responseData);
        } catch (error) {
            console.error("Error during fetch:", error);
        }
    };

    ajax.fetch = async function (requestUrl, isJsonResponse = true) {
        try {
            const response = await fetch(requestUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return isJsonResponse ? await response.json() : await response.text();
        } catch (error) {
            console.error("Error during fetch:", error);
            throw error; 
        }
    };

    window.$ajaxUtils = ajax;
})(window);
