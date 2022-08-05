var table;
var customers, parentTab, childTab;

var defaultColDef = {
    editable: false,
    // set the default column width
    width: 150,
    // make every column editable
    editable: true,
    // make every column use 'text' filter by default
    filter: 'agTextColumnFilter',
    // enable floating filters by default
    floatingFilter: true,
    // make columns resizable
    resizable: true,
    sortable: true
}
var users = [
    // using default ColDef
    { field: 'userID', headerName: 'ID', type: 'numberColumn' },
    { field: 'customer.cusT_NO', headerName: 'Customer No', type: 'numberColumn' },
    { field: 'userName', type: 'User Name', headerName: 'User Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'fName', headerName: 'First Name' },
    { field: 'lName', headerName: 'Last Name' },
    { field: 'customer.nam', headerName: 'Customer Name' },
    { field: 'customer.phonE_1', headerName: 'Phone No' },
    { field: 'customer.slS_REP', headerName: 'Sales Rep' },
];

var salesPerson = [
    // using default ColDef
    { field: 'userID', headerName: 'ID', type: 'numberColumn' },
    { field: 'apiUserID', headerName: 'Api User ID' },
    { field: 'userName', type: 'User Name', headerName: 'User Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'fName', headerName: 'First Name' },
    { field: 'lName', headerName: 'Last Name' },
];
var customer = [
    // using default ColDef
    { field: 'customer.cusT_NO', headerName: 'Customer No', type: 'numberColumn' },
    { field: 'customer.nam', headerName: 'Customer Name' },
    { field: 'customer.phonE_1', headerName: 'Phone No' },
    { field: 'customer.slS_REP', headerName: 'Sales Rep' },
    { field: 'userName', type: 'User Name', headerName: 'User Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'fName', headerName: 'First Name' },
    { field: 'lName', headerName: 'Last Name' },
    { field: 'userID', headerName: 'ID', type: 'numberColumn' },
];
var categoryColumns = [
    // using default ColDef
    { field: 'id', headerName: 'ID', type: 'numberColumn' },
    { field: 'parentID', type: 'numberColumn', headerName: 'Parent ID' },
    { field: 'descr', headerName: 'Description' },
    { field: 'cateG_COD', headerName: 'Category Code' },
    { field: 'subcaT_COD', headerName: 'Sub Category Code' },
    { field: 'descR_UPR', headerName: 'Description Upper' },
];
var itemColumns = {

}

var OrderLines = [
    // using default ColDef
    { field: 'quantity', headerName: 'Quantity' },
    { field: 'iteM_NO', headerName: 'Item No' },
    { field: 'lonG_DESCR', headerName: 'Description' },
    { field: 'barcod', headerName: 'Barcode' },
    { field: 'prof_No_1', headerName: 'Box Quantity' },
    { field: 'price', headerName: 'Price' },
    { field: 'lineTotal', headerName: 'Line Total', type: 'numberColumn', valueFormatter: params => currencyFormatter(params.data.lineTotal, '$')
},
];

var OrderColumns = [
    // using default ColDef
    { field: 'orderID', headerName: 'Order ID', type: 'numberColumn', cellRenderer: 'agGroupCellRenderer'  },
    { field: 'apiCustomer.cusT_NO', headerName: 'Customer No' },
    { field: 'apiCustomer.nam', headerName: 'Customer Name' },
    { field: 'User', headerName: 'User ID' },
    { field: 'orderRefNumber', headerName: 'Order Ref Number' },
    {
        field: 'orderDate', headerName: '0rder Date',
        cellClass: 'dateUS',
        valueFormatter: (params) => {
            var date = new Date(params.value);
            var day = date.getDate().toString().padStart(2, '0');
            var month = (date.getMonth() + 1).toString().padStart(2, '0');
            var year = date.getFullYear().toString().substring(2);
            return month + '/' + day + '/' + year;
        },
    },
    {
        field: 'orderTotal', headerName: 'Order Total', type: 'numberColumn', valueFormatter: params => currencyFormatter(params.data.orderTotal, '$')
    },
    // {
    //     field: 'Email_IsCustomerCopySent', headerName: 'Customer Email', type: 'Boolean',
    //     cellRenderer: params => {
    //         return `<input type='checkbox' ${params.value ? 'checked' : ''} />`;
    //     }
    // },
    // {
    //     field: 'Email_IsAdminCopySent', headerName: 'Admin Email', type: 'Boolean',
    //     cellRenderer: params => {
    //         return `<input type='checkbox' ${params.value ? 'checked' : ''} />`;
    //     }
    // },
    // {
    //     field: 'Email_IsSalesPersonCopySent', headerName: 'Sales Person Email', type: 'Boolean',
    //     cellRenderer: params => {
    //         return `<input type='checkbox' ${params.value ? 'checked' : ''} />`;
    //     }
    // },
];
function currencyFormatter(currency, sign) {
    var sansDec = currency.toFixed(2);
    var formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return sign + `${formatted}`;
}



function OnParentTabChange(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("parentTabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("parentTablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";

    if (tabName === "requests") {
        document.getElementById("tbForgotPasswordRequest").click();
    } else if (tabName === "salesPersons") {
        document.getElementById("tbOnboardedSp").click();
    } else if (tabName === "customers") {
        document.getElementById("tbOnboardedCustomer").click();
    } else if (tabName === "categories") {
        document.getElementById("tbvisibleCategories").click();
    } else if (tabName === "orders") {
        document.getElementById('allOrders').style.display = "block";
        GetOrdersData();
    } else if (tabName === "items") {
        document.getElementById('allItems').style.display = "block";
    }
}

var currentTab;
function OnChildTabChange(evt, tabName) {
    var i, tabcontent, tablinks;
    if (tabName === childTab) return;
    childTab = tabName;
    tabcontent = document.getElementsByClassName("childTabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("childTablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
    currentTab = tabName;
    getTabData(currentTab);

}

function getTabData(tabName) {
    if (tabName == "forgoPaswordRequest") {
        GetForgotPasswordUser(gdOptRequestForgotPassword);
    } else if (tabName == "addressChangeRequest") {
        GetForgotPasswordUser();
    } else if (tabName == "onBoardedSp") {
        GetUserData(gdOptOnBoardedSp, 4, 2);
    } else if (tabName == "inviteSp") {
        GetUserData(gdOptInviteSp, 4, 0);
    } else if (tabName == "invitedSp") {
        GetUserData(gdOptInvitedSp, 4, 1);
    } else if (tabName == "disabledSp") {
        GetUserData(gdOptDisabledSp, 4, 3);
    } else if (tabName == "allSp") {
        GetUserData(gdOptAllSp, 4, '');
    } else if (tabName == "onboardedCustomer") {
        GetUserData(gdOptOnBoardedCustomer, 3, 2);
    } else if (tabName == "invteCustomer") {
        GetUserData(gdOptInviteCustomer, 3, 0);
    } else if (tabName == "invitedCustomer") {
        GetUserData(gdOptInvitedCustomer, 3, 1);
    } else if (tabName == "disabledCustomer") {
        GetUserData(gdOptDisabledCustomer, 3, 3);
    } else if (tabName == "allCustomer") {
        GetUserData(gdOptAllCustomer, 3, '');
    } else if (tabName == "visibleCategories") {
        GetCategoryData(gdOptVisibleCategory, 'visible');
    } else if (tabName == "hiddenCategories") {
        GetCategoryData(gdOptHiddenCategory, 'hidden');
    } else if (tabName == "allCategories") {
        GetCategoryData(gdOpAllCategory, 'all');
    } else if (tabName == "onBoardedSp") {
        GetUserData();
    }
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', () => {
    InitGridDefination();
    // GetCategories();
    // GetOrders();
    document.getElementById("tbRequest").click();
    $(".modal").modal({
        show: false,
        backdrop: 'static'
    });

});

function BtnInviteRenderer() { }
BtnInviteRenderer.prototype.init = function (params) {
    this.params = params;
    this.eGui = document.createElement('button');
    this.eGui.innerHTML = 'Invite';
    this.btnClickedHandler = this.btnClickedHandler.bind(this);
    this.eGui.addEventListener('click', this.btnClickedHandler);
}
BtnInviteRenderer.prototype.getGui = function () {
    return this.eGui;
}
BtnInviteRenderer.prototype.destroy = function () {
    this.eGui.removeEventListener('click', this.btnClickedHandler);
}
BtnInviteRenderer.prototype.btnClickedHandler = function (event) {
    this.params.clicked(this.params);
}
function BtnResendInviteRenderer() { }
BtnResendInviteRenderer.prototype.init = function (params) {
    this.params = params;
    this.eGui = document.createElement('button');
    this.eGui.innerHTML = 'Resend Invite';
    this.btnClickedHandler = this.btnClickedHandler.bind(this);
    this.eGui.addEventListener('click', this.btnClickedHandler);
}
BtnResendInviteRenderer.prototype.getGui = function () {
    return this.eGui;
}
BtnResendInviteRenderer.prototype.destroy = function () {
    this.eGui.removeEventListener('click', this.btnClickedHandler);
}
BtnResendInviteRenderer.prototype.btnClickedHandler = function (event) {
    this.params.clicked(this.params);
}

function BtnEnableRenderer() { }
BtnEnableRenderer.prototype.init = function (params) {
    this.params = params;
    this.eGui = document.createElement('button');
    this.eGui.innerHTML = 'Enable Access';
    this.btnClickedHandler = this.btnClickedHandler.bind(this);
    this.eGui.addEventListener('click', this.btnClickedHandler);
}
BtnEnableRenderer.prototype.getGui = function () {
    return this.eGui;
}
BtnEnableRenderer.prototype.destroy = function () {
    this.eGui.removeEventListener('click', this.btnClickedHandler);
}
BtnEnableRenderer.prototype.btnClickedHandler = function (event) {
    this.params.clicked(this.params);
}

function BtnDisableRenderer() { }
BtnDisableRenderer.prototype.init = function (params) {
    this.params = params;
    this.eGui = document.createElement('button');
    this.eGui.innerHTML = 'Disable Access';
    this.btnClickedHandler = this.btnClickedHandler.bind(this);
    this.eGui.addEventListener('click', this.btnClickedHandler);
}
BtnDisableRenderer.prototype.getGui = function () {
    return this.eGui;
}
BtnDisableRenderer.prototype.destroy = function () {
    this.eGui.removeEventListener('click', this.btnClickedHandler);
}
BtnDisableRenderer.prototype.btnClickedHandler = function (event) {
    this.params.clicked(this.params);
}
function BtnEditeDetailRenderer() { }
BtnEditeDetailRenderer.prototype.init = function (params) {
    this.params = params;
    this.eGui = document.createElement('button');
    this.eGui.innerHTML = 'Edit';
    this.btnClickedHandler = this.btnClickedHandler.bind(this);
    this.eGui.addEventListener('click', this.btnClickedHandler);
}
BtnEditeDetailRenderer.prototype.getGui = function () {
    return this.eGui;
}
BtnEditeDetailRenderer.prototype.destroy = function () {
    this.eGui.removeEventListener('click', this.btnClickedHandler);
}
BtnEditeDetailRenderer.prototype.btnClickedHandler = function (event) {
    this.params.clicked(this.params);
}
var isInvite;

function btnEditDetailsHandler(gridData) {
    isInvite = false;
    //    var id =  $('#password').parent().removeClass('borderError');
    var userIdHtml = $('#userId'),
        firstNameHtml = $('#firstName'),
        lastNameHtml = $('#lastName'),
        userEmailHtml = $('#userEmail'),
        userNameHtml = $('#userName'),
        slsRepNameHtml = $('#slsRepName'),
        slsRepGrpHtml = $('#slsRepGrp'),
        saveLoaderHtml = $('#saveLoader'),
        saveAndInviteHtml = $('#saveAndInvite');

    var userID = gridData.data.userID,
        fName = gridData.data.fName,
        lName = gridData.data.lName,
        email = gridData.data.email,
        isCustomer = gridData.data.customer ? true : false,
        salesRep = isCustomer ? gridData.data.customer.slS_REP : null,
        userName = gridData.data.userName;

    if (isCustomer) {
        slsRepGrpHtml.show();
    } else {
        slsRepGrpHtml.hide();
    }

    saveLoaderHtml.removeClass('loader');
    $('.searchSp').hide();
    $('.search-group').html('');

    firstNameHtml.val(fName);
    userIdHtml.val(userID);
    lastNameHtml.val(lName);
    userEmailHtml.val(email);
    slsRepNameHtml.val(salesRep);

    firstNameHtml.attr('readonly', false);
    userEmailHtml.attr('readonly', false);
    userNameHtml.attr('readonly', false);

    firstNameHtml.attr('required', false);
    userEmailHtml.attr('required', false);
    userNameHtml.attr('required', false);

    firstNameHtml.removeClass('borderError');
    userEmailHtml.removeClass('borderError');
    userNameHtml.removeClass('borderError');

    if (userName) {
        userNameHtml.val(userName);
        userNameHtml.attr('readonly', true);
    } else {
        userNameHtml.val('');
    }

    saveAndInviteHtml.val('Save');
    $('#userValidation').modal('show');
    return;
}
function btnInviteHandler(gridData) {
    isInvite = true;
    //    var id =  $('#password').parent().removeClass('borderError');
    var userIdHtml = $('#userId'),
        firstNameHtml = $('#firstName'),
        lastNameHtml = $('#lastName'),
        userEmailHtml = $('#userEmail'),
        saveLoaderHtml = $('#saveLoader'),
        userNameHtml = $('#userName'),
        saveAndInviteHtml = $('#saveAndInvite');

    var userID = gridData.data.userID,
        fName = gridData.data.fName,
        lName = gridData.data.lName,
        email = gridData.data.email,
        userName = gridData.data.userName;
    saveLoaderHtml.removeClass('loader');
    $('.searchSp').hide();
    $('.search-group').html('');

    userIdHtml.val(userID);
    lastNameHtml.val(lName);

    if (fName) {
        firstNameHtml.val(fName);
        firstNameHtml.removeClass('borderError');
    } else {
        firstNameHtml.val('');
        firstNameHtml.addClass('borderError');
        firstNameHtml.attr('readonly', false);
    }
    if (email) {
        userEmailHtml.val(email);
        userEmailHtml.attr('readonly', true);
        userNameHtml.removeClass('borderError');
    } else {
        userEmailHtml.val('');
        userEmailHtml.attr('readonly', false);
        userEmailHtml.addClass('borderError');
    }
    if (userName) {
        userNameHtml.val(userName);
        userNameHtml.attr('readonly', true);
        userNameHtml.removeClass('borderError');
    } else {
        userNameHtml.val('');
        userNameHtml.attr('readonly', false);
        userNameHtml.addClass('borderError');
    }
    saveAndInviteHtml.val('Save and Invite');
    $('#userValidation').modal('show');
    return;
}

$('#userEmail').keypress(function (val) {

    $('#userEmail').removeClass('borderError');
});
$('#firstName').keypress(function (val) {
    $('#firstName').removeClass('borderError');
});

$('#userName').keypress(function (val) {
    $('#userName').removeClass('borderError');
});

function validate(item) {
    SaveAndInvite();
    return false;
}
function isValidUserName(input) {
    if (input && input.value && input.value.length >= 4) {
        var token = localStorage.getItem("token");
        var requestUrl = localStorage.getItem("apiServer") + 'api/user/checkUserName/' + input.value;
        $.ajax({
            url: requestUrl,
            type: "PUT",
            headers: { "Authorization": "Bearer " + token },
            success: function (data) {
                if (data)
                    $('#valiationError').html(data);
                else
                    $('#valiationError').html("");
            },
            error: function (data) {
                $('#valiationError').html("Something went wrong");
            }

        });
    }
}

function SaveAndInvite() {

    var userIdHtml = $('#userId'),
        firstNameHtml = $('#firstName'),
        lastNameHtml = $('#lastName'),
        userEmailHtml = $('#userEmail'),
        slsRepNameHtml = $('#slsRepName'),
        saveLoaderHtml = $('#saveLoader'),
        userNameHtml = $('#userName');
    var userData = {
        UserID: userIdHtml.val(),
        UserName: userNameHtml.val(),
        FName: firstNameHtml.val(),
        LName: lastNameHtml.val(),
        Email: userEmailHtml.val(),
        SalesRep: slsRepNameHtml.val()
    }
    saveLoaderHtml.addClass('loader');
    $('.searchSp').hide();
    $('.search-group').html('');

    var endpoint = isInvite ? 'saveandinvite' : 'save';
    var token = localStorage.getItem("token");
    var requestUrl = localStorage.getItem("apiServer") + 'api/user/' + endpoint;
    $.ajax({
        url: requestUrl,
        type: "PUT",
        data: JSON.stringify(userData),
        headers: {
            "Authorization": "Bearer " + token,
            "content-type": "application/json"
        },
        success: function (data) {
            $('#userValidation').modal('hide');
            $('#successMsg').modal('show');
            getTabData(currentTab);
        },
        error: function (data) {
            saveLoaderHtml.removeClass('loader');
            $('#valiationError').html(data.responseJSON.error);


        }

    });
}

function btnResendInviteHandler(gridData) {

    var modalConfirm = function (callback) {
        $("#confirmChoice").modal('show');
        $("#confirmYes").on("click", function () {
            callback();
            $("#confirmChoice").modal('hide');
        });
    };

    modalConfirm(function (confirm) {
        var token = localStorage.getItem("token");
        var requestUrl = localStorage.getItem("apiServer") + 'api/user/resendinvite/' + gridData.data.userID;
        $.ajax({
            url: requestUrl,
            type: "PUT",
            headers: { "Authorization": "Bearer " + token },
            success: function (data) {
                $('#successMsg').modal('show');
                getTabData(currentTab);
            },
            error: function (data) {
            }
        });
    });


}

function btnDisableHandler(gridData) {
    var modalConfirm = function (callback) {
        $("#confirmChoice").modal('show');
        $("#confirmYes").on("click", function () {
            callback();
            $("#confirmChoice").modal('hide');
        });
    };

    modalConfirm(function (confirm) {
        var token = localStorage.getItem("token");
        var requestUrl = localStorage.getItem("apiServer") + 'api/user/disable/' + gridData.data.userID;
        $.ajax({
            url: requestUrl,
            type: "PUT",
            headers: { "Authorization": "Bearer " + token },
            success: function (data) {
                $('#successMsg').modal('show');
                getTabData(currentTab);
            },
            error: function (data) {
                alert("Some Error occured");
            }

        });
    });
}

function btnEnableHandler(gridData) {
    var modalConfirm = function (callback) {
        $("#confirmChoice").modal('show');
        $("#confirmYes").on("click", function () {
            callback();
            $("#confirmChoice").modal('hide');
        });
    };

    modalConfirm(function (confirm) {

        var token = localStorage.getItem("token");
        var requestUrl = localStorage.getItem("apiServer") + 'api/user/enable/' + gridData.data.userID;
        $.ajax({
            url: requestUrl,
            type: "PUT",
            headers: { "Authorization": "Bearer " + token },
            success: function (data) {
                $('#successMsg').modal('show');
                getTabData(currentTab);
            },
            error: function (data) {
                alert("Some Error occured");
            }

        });
    });
}


function inviteUserHandler(data) {
    var token = localStorage.getItem("token");
    var requestUrl = localStorage.getItem("apiServer") + 'api/user/invite/' + data.data.userID;
    $.ajax({
        url: requestUrl,
        type: "PUT",
        headers: { "Authorization": "Bearer " + token },
        success: function (data) {
            $('#successMsg').modal('show');
            getTabData(currentTab);
        },
        error: function (data) {
            alert("Some Error occured");
        }

    });
}

function InitGridDefination() {

    InitSalesPersonGridDefination();
    InitCustomerGridDefination();
    InitCategoriesGridDefination();
    InitOrderGridDefination();
    InitRequestGridDefination();
}
var gdOptRequestForgotPassword;
function InitRequestGridDefination() {
    var gridDiv;
    gdOptRequestForgotPassword = {
        // define grid columns
        columnDefs: [...users],
        // default ColDef, gets applied to every column
        defaultColDef: defaultColDef,
        // define specific column types
        columnTypes: {
            numberColumn: { width: 130, filter: 'agNumberColumnFilter' },
            nonEditableColumn: { editable: false }
        },
        rowData: null,
        components: {
            btnResendInviteRenderer: BtnResendInviteRenderer
        }
    };
    gdOptRequestForgotPassword.columnDefs.splice(0, 0, {
        headerName: 'Action', cellRenderer: 'btnResendInviteRenderer', filter: false,
        cellRendererParams: {
            clicked: this.btnResendInviteHandler.bind(this),
        },
    })
    gridDiv = document.querySelector('#gdForgotPasswordRequest');
    new agGrid.Grid(gridDiv, gdOptRequestForgotPassword);
}

var gdOptOnBoardedSp, gdOptInviteSp, gdOptInvitedSp, gdOptDisabledSp, gdOptAllSp;
function InitSalesPersonGridDefination() {
    var gridDiv;


    gdOptOnBoardedSp = {
        // define grid columns
        columnDefs: [...salesPerson],
        // default ColDef, gets applied to every column
        defaultColDef: defaultColDef,
        // define specific column types
        columnTypes: {
            numberColumn: { width: 130, filter: 'agNumberColumnFilter' },
            nonEditableColumn: { editable: false }
        },
        rowData: null,
        components: {
            btnDisableRenderer: BtnDisableRenderer
        }
    };

    gdOptOnBoardedSp.columnDefs.splice(0, 0, {
        headerName: 'Action', cellRenderer: 'btnDisableRenderer', filter: false,
        cellRendererParams: {
            clicked: this.btnDisableHandler.bind(this),
        },
    })

    gridDiv = document.querySelector('#gdOnBoardedSp');
    new agGrid.Grid(gridDiv, gdOptOnBoardedSp);

    gdOptInviteSp = {
        // define grid columns
        columnDefs: [...salesPerson],
        // default ColDef, gets applied to every column
        defaultColDef: defaultColDef,
        // define specific column types
        columnTypes: {
            numberColumn: { width: 130, filter: 'agNumberColumnFilter' },
            nonEditableColumn: { editable: false }
        },
        rowData: null,
        components: {
            btnInviteRenderer: BtnInviteRenderer
        }
    };
    gdOptInviteSp.columnDefs.splice(0, 0, {
        headerName: 'Action', cellRenderer: 'btnInviteRenderer', filter: false,
        cellRendererParams: {
            clicked: this.btnInviteHandler.bind(this),
        },
    })
    gridDiv = document.querySelector('#gdInviteSP');
    new agGrid.Grid(gridDiv, gdOptInviteSp);

    gdOptInvitedSp = {
        // define grid columns
        columnDefs: [...salesPerson],
        // default ColDef, gets applied to every column
        defaultColDef: defaultColDef,
        // define specific column types
        columnTypes: {
            numberColumn: { width: 130, filter: 'agNumberColumnFilter' },
            nonEditableColumn: { editable: false }
        },
        rowData: null,
        components: {
            btnResendInviteRenderer: BtnResendInviteRenderer
        }
    };
    gdOptInvitedSp.columnDefs.splice(0, 0, {
        headerName: 'Action', cellRenderer: 'btnResendInviteRenderer', filter: false,
        cellRendererParams: {
            clicked: this.btnResendInviteHandler.bind(this),
        },
    })
    gridDiv = document.querySelector('#gdInvitedSP');
    new agGrid.Grid(gridDiv, gdOptInvitedSp);

    gdOptDisabledSp = {
        // define grid columns
        columnDefs: [...salesPerson],
        // default ColDef, gets applied to every column
        defaultColDef: defaultColDef,
        // define specific column types
        columnTypes: {
            numberColumn: { width: 130, filter: 'agNumberColumnFilter' },
            nonEditableColumn: { editable: false }
        },
        rowData: null,
        components: {
            btnEnableRenderer: BtnEnableRenderer
        }
    };
    gdOptDisabledSp.columnDefs.splice(0, 0, {
        headerName: 'Action', cellRenderer: 'btnEnableRenderer', filter: false,
        cellRendererParams: {
            clicked: this.btnEnableHandler.bind(this),
        },
    })
    gridDiv = document.querySelector('#gdDisabledSp');
    new agGrid.Grid(gridDiv, gdOptDisabledSp);

    gdOptAllSp = {
        // define grid columns
        columnDefs: [...salesPerson],
        // default ColDef, gets applied to every column
        defaultColDef: defaultColDef,
        // define specific column types
        columnTypes: {
            numberColumn: { width: 130, filter: 'agNumberColumnFilter' },
            nonEditableColumn: { editable: false }
        },
        rowData: null,
        components: {
            btnEditeDetailRenderer: BtnEditeDetailRenderer
        }
    };
    gdOptAllSp.columnDefs.splice(0, 0, {
        headerName: 'Action', cellRenderer: 'btnEditeDetailRenderer', filter: false,
        cellRendererParams: {
            clicked: this.btnEditDetailsHandler.bind(this),
        },
    })
    gridDiv = document.querySelector('#gdAllSp');
    new agGrid.Grid(gridDiv, gdOptAllSp);
}


var gdOptOnBoardedCustomer, gdOptInviteCustomer, gdOptInvitedCustomer, gdOptDisabledCustomer, gdOptAllCustomer;
function InitCustomerGridDefination() {
    var gridDiv;
    gdOptOnBoardedCustomer = {
        // define grid columns
        columnDefs: [...customer],
        // default ColDef, gets applied to every column
        defaultColDef: defaultColDef,
        // define specific column types
        columnTypes: {
            numberColumn: { width: 130, filter: 'agNumberColumnFilter' },
            nonEditableColumn: { editable: false }
        },
        rowData: null,
        components: {
            btnDisableRenderer: BtnDisableRenderer
        }
    };

    gdOptOnBoardedCustomer.columnDefs.splice(0, 0, {
        headerName: 'Action', cellRenderer: 'btnDisableRenderer', filter: false,
        cellRendererParams: {
            clicked: this.btnDisableHandler.bind(this),
        },
    })
    gridDiv = document.querySelector('#gdOnboardedCustomer');
    new agGrid.Grid(gridDiv, gdOptOnBoardedCustomer);

    gdOptInviteCustomer = {
        // define grid columns
        columnDefs: [...customer],
        // default ColDef, gets applied to every column
        defaultColDef: defaultColDef,
        // define specific column types
        columnTypes: {
            numberColumn: { width: 130, filter: 'agNumberColumnFilter' },
            nonEditableColumn: { editable: false }
        },
        rowData: null,
        components: {
            btnInviteRenderer: BtnInviteRenderer
        }
    };
    gdOptInviteCustomer.columnDefs.splice(0, 0, {
        headerName: 'Action', cellRenderer: 'btnInviteRenderer', filter: false,
        cellRendererParams: {
            clicked: this.btnInviteHandler.bind(this),
        },
    })
    gridDiv = document.querySelector('#gdinvteCustomer');
    new agGrid.Grid(gridDiv, gdOptInviteCustomer);

    gdOptInvitedCustomer = {
        // define grid columns
        columnDefs: [...customer],
        // default ColDef, gets applied to every column
        defaultColDef: defaultColDef,
        // define specific column types
        columnTypes: {
            numberColumn: { width: 130, filter: 'agNumberColumnFilter' },
            nonEditableColumn: { editable: false }
        },
        rowData: null,
        components: {
            btnResendInviteRenderer: BtnResendInviteRenderer
        }
    };
    gdOptInvitedCustomer.columnDefs.splice(0, 0, {
        headerName: 'Action', cellRenderer: 'btnResendInviteRenderer', filter: false,
        cellRendererParams: {
            clicked: this.btnResendInviteHandler.bind(this),
        },
    })
    gridDiv = document.querySelector('#gdInvitedCustomer');
    new agGrid.Grid(gridDiv, gdOptInvitedCustomer);

    gdOptDisabledCustomer = {
        // define grid columns
        columnDefs: [...customer],
        // default ColDef, gets applied to every column
        defaultColDef: defaultColDef,
        // define specific column types
        columnTypes: {
            numberColumn: { width: 130, filter: 'agNumberColumnFilter' },
            nonEditableColumn: { editable: false }
        },
        rowData: null,
        components: {
            btnEnableRenderer: BtnEnableRenderer
        }
    };
    gdOptDisabledCustomer.columnDefs.splice(0, 0, {
        headerName: 'Action', cellRenderer: 'btnEnableRenderer', filter: false,
        cellRendererParams: {
            clicked: this.btnEnableHandler.bind(this),
        },
    })
    gridDiv = document.querySelector('#gdDisabledCustomer');
    new agGrid.Grid(gridDiv, gdOptDisabledCustomer);

    gdOptAllCustomer = {
        // define grid columns
        columnDefs: [...customer],
        // default ColDef, gets applied to every column
        defaultColDef: defaultColDef,
        // define specific column types
        columnTypes: {
            numberColumn: { width: 130, filter: 'agNumberColumnFilter' },
            nonEditableColumn: { editable: false }
        },
        rowData: null,
        components: {
            btnEditeDetailRenderer: BtnEditeDetailRenderer
        }
    };
    gdOptAllCustomer.columnDefs.splice(0, 0, {
        headerName: 'Action', cellRenderer: 'btnEditeDetailRenderer', filter: false,
        cellRendererParams: {
            clicked: this.btnEditDetailsHandler.bind(this),
        },
    })
    gridDiv = document.querySelector('#gdAllCustomer');
    new agGrid.Grid(gridDiv, gdOptAllCustomer);
}


var gdOptVisibleCategory, gdOptHiddenCategory, gdOpAllCategory;

function InitCategoriesGridDefination() {
    var gridDiv;
    gdOptVisibleCategory = {
        // define grid columns
        columnDefs: [...categoryColumns],
        // default ColDef, gets applied to every column
        defaultColDef: defaultColDef,
        // define specific column types
        columnTypes: {
            numberColumn: { width: 130, filter: 'agNumberColumnFilter' },
            nonEditableColumn: { editable: false }
        },
        rowData: null,
        components: {
            btnHideCategoryRenderer: BtnHideCategoryRenderer
        }
    };

    gdOptVisibleCategory.columnDefs.splice(0, 0, {
        headerName: 'Action', cellRenderer: 'btnHideCategoryRenderer', filter: false,
        cellRendererParams: {
            clicked: this.btnHideCategoryHandler.bind(this),
        },
    })
    gridDiv = document.querySelector('#gdVisibleCat');
    new agGrid.Grid(gridDiv, gdOptVisibleCategory);
    gdOptHiddenCategory = {
        // define grid columns
        columnDefs: [...categoryColumns],
        // default ColDef, gets applied to every column
        defaultColDef: defaultColDef,
        // define specific column types
        columnTypes: {
            numberColumn: { width: 130, filter: 'agNumberColumnFilter' },
            nonEditableColumn: { editable: false }
        },
        rowData: null,
        components: {
            btnShowCategoryRenderer: BtnShowCategoryRenderer
        }
    };

    gdOptHiddenCategory.columnDefs.splice(0, 0, {
        headerName: 'Action', cellRenderer: 'btnShowCategoryRenderer', filter: false,
        cellRendererParams: {
            clicked: this.btnShowCategoryHandler.bind(this),
        },
    })
    gridDiv = document.querySelector('#gdHiddenCat');
    new agGrid.Grid(gridDiv, gdOptHiddenCategory);
    var gridDiv;
    gdOpAllCategory = {
        // define grid columns
        columnDefs: [...categoryColumns],
        // default ColDef, gets applied to every column
        defaultColDef: defaultColDef,
        // define specific column types
        columnTypes: {
            numberColumn: { width: 130, filter: 'agNumberColumnFilter' },
            nonEditableColumn: { editable: false }
        },
        rowData: null,
        components: {
            btnDisableRenderer: BtnDisableRenderer
        }
    };

    gdOpAllCategory.columnDefs.splice(0, 0, {
        headerName: 'Action', cellRenderer: 'btnDisableRenderer', filter: false,
        cellRendererParams: {
            clicked: this.btnShowCategoryHandler.bind(this),
        },
    })
    gridDiv = document.querySelector('#gdAllCat');
    new agGrid.Grid(gridDiv, gdOpAllCategory);
}


function BtnHideCategoryRenderer() { }
BtnHideCategoryRenderer.prototype.init = function (params) {
    this.params = params;
    this.eGui = document.createElement('button');
    this.eGui.innerHTML = 'Hide';
    this.btnClickedHandler = this.btnClickedHandler.bind(this);
    this.eGui.addEventListener('click', this.btnClickedHandler);
}
BtnHideCategoryRenderer.prototype.getGui = function () {
    return this.eGui;
}
BtnHideCategoryRenderer.prototype.destroy = function () {
    this.eGui.removeEventListener('click', this.btnClickedHandler);
}
BtnHideCategoryRenderer.prototype.btnClickedHandler = function (event) {
    this.params.clicked(this.params);
}

function btnHideCategoryHandler(gridData) {
    var modalConfirm = function (callback) {
        $("#confirmChoice").modal('show');
        $("#confirmYes").on("click", function () {
            callback();
            $("#confirmChoice").modal('hide');
        });
    };

    modalConfirm(function (confirm) {
        var token = localStorage.getItem("token");
        var requestUrl = localStorage.getItem("apiServer") + 'api/categories/' + gridData.data.id + '/true';
        $.ajax({
            url: requestUrl,
            type: "PUT",
            headers: { "Authorization": "Bearer " + token },
            success: function (data) {
                $('#successMsg').modal('show');
                getTabData(currentTab);
            },
            error: function (data) {
            }
        });
    });
}

function BtnShowCategoryRenderer() { }
BtnShowCategoryRenderer.prototype.init = function (params) {
    this.params = params;
    this.eGui = document.createElement('button');
    this.eGui.innerHTML = 'Show';
    this.btnClickedHandler = this.btnClickedHandler.bind(this);
    this.eGui.addEventListener('click', this.btnClickedHandler);
}
BtnShowCategoryRenderer.prototype.getGui = function () {
    return this.eGui;
}
BtnShowCategoryRenderer.prototype.destroy = function () {
    this.eGui.removeEventListener('click', this.btnClickedHandler);
}
BtnShowCategoryRenderer.prototype.btnClickedHandler = function (event) {
    this.params.clicked(this.params);
}

function btnShowCategoryHandler(gridData) {
    var modalConfirm = function (callback) {
        $("#confirmChoice").modal('show');
        $("#confirmYes").on("click", function () {
            callback();
            $("#confirmChoice").modal('hide');
        });
    };

    modalConfirm(function (confirm) {
        var token = localStorage.getItem("token");
        var requestUrl = localStorage.getItem("apiServer") + 'api/categories/' + gridData.data.id + '/false';
        $.ajax({
            url: requestUrl,
            type: "PUT",
            headers: { "Authorization": "Bearer " + token },
            success: function (data) {
                $('#successMsg').modal('show');
                getTabData(currentTab);
            },
            error: function (data) {
            }
        });
    });
}

var gdOptOrders;
function InitOrderGridDefination() {
    gdOptOrders = {
        // define grid columns
        columnDefs: [...OrderColumns],
        // default ColDef, gets applied to every column
        defaultColDef: defaultColDef,
        // define specific column types
        masterDetail: true,
        columnTypes: {
            numberColumn: { width: 130, filter: 'agNumberColumnFilter' },
            medalColumn: { width: 100, columnGroupShow: 'open', filter: false },
            nonEditableColumn: { editable: false },
            dateColumn: {
                // specify we want to use the date filter
                filter: 'agDateColumnFilter',

                // add extra parameters for the date filter
                filterParams: {
                    // provide comparator function
                    comparator: (filterLocalDateAtMidnight, cellValue) => {
                        // In the example application, dates are stored as dd/mm/yyyy
                        // We create a Date object for comparison against the filter date
                        const dateParts = cellValue.split('/');
                        const day = Number(dateParts[0]);
                        const month = Number(dateParts[1]) - 1;
                        const year = Number(dateParts[2]);
                        const cellDate = new Date(year, month, day);

                        // Now that both parameters are Date objects, we can compare
                        if (cellDate < filterLocalDateAtMidnight) {
                            return -1;
                        } else if (cellDate > filterLocalDateAtMidnight) {
                            return 1;
                        } else {
                            return 0;
                        }
                    },
                },
            },
        },
        masterDetail: true,
        detailCellRendererParams: {
            // level 2 grid options
            detailGridOptions: {
                columnDefs: [...OrderLines],
                defaultColDef: defaultColDef,
            },
            getDetailRowData: (params) => {
                params.successCallback(params.data.items);
            },
        },
        // rowData: null,
        // components: {
        //     btnDisableRenderer: BtnDisableRenderer
        // },
        // detailCellRendererParams: {
        //     detailGridOptions: {
        //         columnDefs: [...OrderLines],
        //         groupDefaultExpanded: 1,
        //     },
        //     getDetailRowData: (params) => {
        //         params.successCallback(params.data.children);
        //       },
        // }
    };

    gridDiv = document.querySelector('#gdOrders');
    new agGrid.Grid(gridDiv, gdOptOrders);
}

function GetForgotPasswordUser(grdOpt) {
    var token = localStorage.getItem("token");
    var requestUrl = localStorage.getItem("apiServer") + 'api/user/request';
    $.ajax({
        url: requestUrl,
        type: "GET",
        headers: { "Authorization": "Bearer " + token },
        success: function (data) {
            // windowHeight = window.innerHeight
            grdOpt.api.setRowData(data);
            grdOpt.api.sizeColumnsToFit();
        }
    });
}

function GetUserData(grdOpt, userType, userStatus) {
    var token = localStorage.getItem("token");
    var requestUrl = localStorage.getItem("apiServer") + 'api/user?userRole=' + userType + '&userStatus=' + userStatus;
    $.ajax({
        url: requestUrl,
        type: "GET",
        headers: { "Authorization": "Bearer " + token },
        success: function (data) {
            // windowHeight = window.innerHeight
            grdOpt.api.setRowData(data);
            grdOpt.api.sizeColumnsToFit();
        }
    });
}
function GetCategoryData(grdOpt, tabType) {
    var token = localStorage.getItem("token");
    var requestUrl = localStorage.getItem("apiServer") + 'api/categories/' + tabType;
    $.ajax({
        url: requestUrl,
        type: "GET",
        headers: { "Authorization": "Bearer " + token },
        success: function (data) {
            // windowHeight = window.innerHeight
            grdOpt.api.setRowData(data);
            grdOpt.api.sizeColumnsToFit();
        }
    });
}
function GetOrdersData() {
    var token = localStorage.getItem("token");
    var requestUrl = localStorage.getItem("apiServer") + 'api/order';
    $.ajax({
        url: requestUrl,
        type: "GET",
        headers: { "Authorization": "Bearer " + token },
        success: function (data) {
            windowHeight = window.innerHeight
            gdOptOrders.api.setRowData(data);
            gdOptOrders.api.sizeColumnsToFit();
        }
    });
}
function salesPersonFocus(value) {
    GetSalesPerson('');
}
// Init a timeout variable to be used below
let timeout = null;
let input = document.getElementById('slsRepName');
input.addEventListener('keyup', function (e) {
    // Clear the timeout if it has already been set.
    // This will prevent the previous task from executing
    // if it has been less than <MILLISECONDS>
    clearTimeout(timeout);

    // Make a new timeout set to go off in 1000ms (1 second)
    timeout = setTimeout(function () {
        GetSalesPerson(input.value);
    }, 1000);
});

function GetSalesPerson(filter) {
    var token = localStorage.getItem("token");
    var requestUrl = localStorage.getItem("apiServer") + 'api/user/salesperson?filter=' + filter;
    $.ajax({
        url: requestUrl,
        type: "GET",
        headers: { "Authorization": "Bearer " + token },
        success: function (data) {
            serachitembind(data);
        }
    });
}

function serachitembind(list) {
    var markup = '';
    custIDinput = '';
    $('.searchSp').show();

    if (list.length == 0) {
        $('.search-group').html('No matching customer found.');

    } else {
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            markup += '<li id=' + item.userID + ' style="padding: 6px 20px; class="search-suggestion">' + item.userName + '</li>';
        }
        markup = '<div id="search-v">' + markup + ' </div>';
        $('.search-group').html(markup);
        $('.searchIteam').show();

        if (document.getElementById("search-v"))
            document.getElementById("search-v").addEventListener("click", SearchItemClicked);
    }
}
function SearchItemClicked(e) {
    if (e.target && e.target) {
        var salesPerson = e.target.textContent;
        $('#slsRepName')[0].value = salesPerson;
        $('.search-group').html('');
        $('.searchSp').hide();
    }
}

