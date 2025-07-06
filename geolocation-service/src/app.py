from spyne import Application, rpc, ServiceBase, Unicode, Float
from spyne.protocol.soap import Soap11
from spyne.server.wsgi import WsgiApplication

import os
from dotenv import load_dotenv

load_dotenv()

class GeoService(ServiceBase):
    @rpc(Unicode, _returns=Float)
    def getLatitude(ctx, address):
        # TODO: integrate with real geocoding provider
        return 40.7128  # stub value

    @rpc(Unicode, _returns=Float)
    def getLongitude(ctx, address):
        return -74.0060  # stub value

application = Application(
    [GeoService],
    tns='geolocation.soap.service',
    in_protocol=Soap11(validator='lxml'),
    out_protocol=Soap11()
)

wsgi_app = WsgiApplication(application)

if __name__ == '__main__':
    from wsgiref.simple_server import make_server
    port = int(os.getenv('PORT', 3018))
    server = make_server('0.0.0.0', port, wsgi_app)
    print(f"geolocation-service (SOAP) listening on port {port}")
    server.serve_forever()
