sap.ui.controller("flightapp.details", {


    onInit: function () {

        this.router = sap.ui.core.UIComponent.getRouterFor(this);
        this.router.attachRoutePatternMatched(this._handleRouteMatched, this);

    },
    _handleRouteMatched: function (evt) {
        if ("details" !== evt.getParameter("name")) {
            return;
        }

        console.log("I m handled");
        
        var form = this.byId("formDetails");
        var jModel = new sap.ui.model.json.JSONModel();
        

        var carrid = evt.getParameter("arguments").carrid;
        var connid = evt.getParameter("arguments").connid;
        var fldate = evt.getParameter("arguments").fldate;

        var path = "/FlightCollection(carrid='" + carrid + "',connid='" + connid + "',fldate=datetime'" + fldate + "')";
        oModel.read(path, null, null, false,

            function (odata, response) {
                //console.log("data recieved" + odata.results[0].carrid);
                jModel.setData(odata);
            }

        );

        
        //this.getView().setModel(jModel, "airlines");
        form.setModel(jModel);
        //list.setModel(jModel, "airlines");

        //list.bindItems("/airlines");
    },
    goBack: function () { },

    getDetails: function (evt) {

        var source = evt.getSource();
        var context = evt.getSource().getBindingContext();
        var uri = context.oModel.oData[0].__metadata.uri;
        var router = sap.ui.core.UIComponent.getRouterFor(this);
        router.navTo("details", { sPath: uri }, false);
    }
});