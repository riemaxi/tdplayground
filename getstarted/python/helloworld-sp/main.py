from config import config
from system import System

class Prompt(System):
    def __init__(self):
        super().__init__(config['system'])

        while 1:
            pass

    def on_denied(self, data):
        print(f'denied to {self.address}')

    def on_granted(self, data):
        self.address = data['address']
        print(f'granted to {self.address}')
        self.request(self.peers['greeter'], {})

    def on_request(self, r):
        detail = r['detail']
        id = detail['id']
        to = detail['to']
        data = detail['data']
        print(id, to, data)

    def on_response(self, r):
        print(r['from'], r['timestamp'], r['detail'])
        self.request(r['from'], {})

# Instantiate the class to start the process
Prompt()


loop()