from tdpnet import Session
from codec import Codec

codec = Codec()

class System(Session):
    def __init__(self, config):
        super().__init__()

        self.credentials = config['credentials']
        self.address = self.credentials['address']
        self.host = config['host']
        self.peers = config['peers']

        self.connect(self.host)

    def on_connected(self):
        self.signin(self.credentials)

    def reconnect(self):
        self.connect(self.host)

    def on_granted(self, data):
        pass

    def on_denied(self, data):
        pass

    def on_signal(self, data, valid):
        self.on_command(data, valid, True)

    def on_data(self, data, valid):
        self.on_command(data, valid, False)

    def on_command(self, data, valid, signal):
        if data['subject'] == 'request':
            self.on_request(data)
        elif data['subject'] == 'response':
            self.on_response(data)

    def on_request(self, data):
        pass

    def on_response(self, data):
        pass

    def request(self, to, detail):
        self.send('data', self.message(
            self.address,
            to,
            'request',
            detail
        ))

