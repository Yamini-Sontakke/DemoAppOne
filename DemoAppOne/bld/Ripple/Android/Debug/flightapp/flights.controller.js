sap.ui.controller("flightapp.flights", {


    onInit: function () {

        this.router = sap.ui.core.UIComponent.getRouterFor(this);
        this.router.attachRoutePatternMatched(this._handleRouteMatched, this);

    },
    _handleRouteMatched: function (evt) {
        if ("flights" !== evt.getParameter("name")) {
            return;
        }

        console.log("I m handled");
        //oModel.read("/CarrierCollection?$top=10");
        // this.getView().setModel(oModel);
        var list = this.byId("flights");
        var jModel = new sap.ui.model.json.JSONModel();

        var carrid = evt.getParameter("arguments").carrid;
        oModel.read("/CarrierCollection('"+carrid+"')/carrierFlights", null, null, false,

            function (odata, response) {
                //console.log("data recieved" + odata.results[0].carrid);
                jModel.setData(odata.results);
            }

        );

        var aJson = new sap.ui.model.json.JSONModel({ id: "yash" });
        //this.getView().setModel(jModel, "airlines");
        list.setModel(jModel);
        //list.setModel(jModel, "airlines");

        //list.bindItems("/airlines");
    },
    goBack: function () { },

    getDetails: function (evt) {

        var source = evt.getSource();
        var context = evt.getSource().getBindingContext();
        var index = parseInt(context.sPath.substring(1));
        var keyone = context.oModel.oData[index].carrid;
        var keytwo = context.oModel.oData[index].connid;
        var keythree = context.oModel.oData[index].fldate;
        //var uri = decodeURI(context.oModel.oData[0].__metadata.uri);
        var router = sap.ui.core.UIComponent.getRouterFor(this);
        router.navTo("details", { carrid: keyone, connid: keytwo, fldate: keythree }, false);
    }
});