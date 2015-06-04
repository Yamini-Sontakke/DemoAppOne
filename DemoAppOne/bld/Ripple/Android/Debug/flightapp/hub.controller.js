sap.ui.controller("flightapp.hub", {


    onInit: function () {
 
        this.router = sap.ui.core.UIComponent.getRouterFor(this);
        this.router.attachRoutePatternMatched(this._handleRouteMatched, this);
        
    },
    _handleRouteMatched: function (evt) {
        if ("hub" !== evt.getParameter("name")) {
            return;
        }
       
        console.log("I m handled");
        //oModel.read("/CarrierCollection?$top=10");
       // this.getView().setModel(oModel);
        var list = this.byId("airlines");
        var jModel = new sap.ui.model.json.JSONModel();

        
        oModel.read("/CarrierCollection?", null, null, false, 

            function (odata, response) {
                console.log("data recieved" + odata.results[0].carrid);
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
    
    getFlights: function (evt) {

        var source = evt.getSource();
        var context = evt.getSource().getBindingContext();
        var index = parseInt(context.sPath.substring(1));
        var id = context.oModel.oData[index].carrid;
        
         //var path = "/CarrierCollection('"+carrid+"')"+"carrierFlights";
        var router = sap.ui.core.UIComponent.getRouterFor(this);
        router.navTo("flights", {carrid:id}, false);
    }
});