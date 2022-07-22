
function makeGetRequest(url, params, successFn, failureFn) {
    $.ajax({
        url: url,
        dataType: 'json',
        type: 'GET',
        headers: {
            "content-type": "application/json",
            "Authorization" : localStorage.getItem('token')
        },
        param: params,
        success: function (data) {
            successFn(data);
        },
        error: function (data) {
            failureFn(data);
        }
    });
}

function makePostRequest(url, jsonData, params, successFn, failureFn) {
    $.ajax({
        url: url,
        dataType: 'json',
        type: 'POST',
        headers: {
            "content-type": "application/json",
            "Authorization" : localStorage.getItem('token')
        },
        data: jsonData,
        param: params,
        success: function (data) {
            successFn(data);
        },
        error: function (data) {
            failureFn(data);
        }
    });
}

function makePutRequest(url, jsonData, params, successFn, failureFn) {
    $.ajax({
        url: url,
        dataType: 'json',
        type: 'PUT',
        headers: {
            "content-type": "application/json",
            "Authorization" : localStorage.getItem('token')
        },
        data: jsonData,
        param: params,
        success: function (data) {
            successFn(data);
        },
        error: function (data) {
            failureFn(data);
        }
    });
}

function makeDeleteRequest(url, jsonData, params, successFn, failureFn) {
    $.ajax({
        url: url,
        dataType: 'json',
        type: 'DELETE',
        headers: {
            "content-type": "application/json",
            "Authorization" : localStorage.getItem('token')
        },
        data: jsonData,
        param: params,
        success: function (data) {
            successFn(data);
        },
        error: function (data) {
            failureFn(data);
        }
    });
}
