jQuery.sap.declare("com.app.Component");

sap.ui.core.UIComponent.extend("com.app.Component", {
    metadata: {
        routing: {
            config: {
                viewType: "XML",
                viewPath: "flightapp",
                targetControl: "navContainer",
                targetAggregation: "pages",
                clearTarget: false
            },
            routes: [
			          {
			              pattern: "",
			              name: "hub",
			              view: "hub"
			          },
			          {
			              pattern: "/CarrierCollection('{carrid}')/carrierFlights",
			              name: "flights",
			              view: "flights"
			          },
                      
			          {
			              pattern: "/FlightCollection(carrid='{carrid}',connid='{connid}',fldate=datetime'{fldate}'",
			              name: "details",
                          view:"details"
			          }]
        }
    }
});

com.app.Component.prototype.init = function () {
    jQuery.sap.require("sap.ui.core.routing.History");
    jQuery.sap.require("sap.m.routing.RouteMatchedHandler");

    sap.ui.core.UIComponent.prototype.init.apply(this);

    var router = this.getRouter();
    this.routeHandler = new sap.m.routing.RouteMatchedHandler(router);
    router.initialize();
};
com.app.Component.prototype.destroy = function () {
    if (this.routeHandler) {
        this.routeHandler.destroy();
    }
    sap.ui.core.UIComponent.destroy.apply(this, arguments);
};
com.app.Component.prototype.createContent = function () {
    this.view = sap.ui.view({ id: "app", viewName: "flightapp.App", type: sap.ui.core.mvc.ViewType.JS });
    return this.view;
};