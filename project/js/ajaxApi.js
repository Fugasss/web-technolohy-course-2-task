(function (window) {
    let ajax = {};

    function getRequestObject() {
        if (window.XMLHttpRequest) {
            return (new XMLHttpRequest());
        }
        else if (window.ActiveXObject) {
            // For very old IE browsers (optional)
            return (new ActiveXObject("Microsoft.XMLHTTP"));
        }
        else {
            global.alert("Ajax is not supported!");
            return (null);
        }
    }

    ajax.get =
        function (requestUrl, responseHandler, isJsonResponse) {
            var request = getRequestObject();
            request.onreadystatechange =
                function () {
                    handleResponse(request,
                        responseHandler,
                        isJsonResponse);
                };
            request.open("GET", requestUrl, true);
            request.send(null); // for POST only
        };


    function handleResponse(request,
        responseHandler,
        isJsonResponse) {
        if ((request.readyState == 4) &&
            (request.status == 200)) {

            if (isJsonResponse == undefined) {
                isJsonResponse = true;
            }

            if (isJsonResponse) {
                responseHandler(JSON.parse(request.responseText));
            }
            else {
                responseHandler(request.responseText);
            }
        }
    }


    window.$ajaxUtils = ajax;
})(window);