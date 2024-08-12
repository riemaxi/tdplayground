import socketio
import uuid
from http.server import BaseHTTPRequestHandler, HTTPServer
from socketserver import ThreadingMixIn
import os
import time

class Session:
    def __init__(self):
        self.socket = None

    def connect(self, host):
        self.manager = socketio.Client()
        self.manager.on('error', self.on_error)
        self.manager.on('connect', lambda: self.on_connected())
        self.manager.on('granted', self.on_granted)
        self.manager.on('denied', self.on_denied)
        self.manager.on('data', lambda data: self.on_data(data, self.valid(data)))
        self.manager.on('signal', lambda data: self.on_signal(data, self.valid(data)))
        self.manager.connect(host)

    def on_error(self, data):
        pass

    def on_connected(self):
        pass

    def on_granted(self, data):
        pass

    def on_denied(self, data):
        pass

    def on_data(self, data, valid):
        self.on_command(data, valid, False)

    def on_signal(self, data, valid):
        self.on_command(data, valid, True)

    def on_command(self, data, valid, signal):
        pass

    def valid(self, data):
        return 'from' in data

    def send(self, id, data):
        self.manager.emit(id, data)

    def signin(self, data):
        self.send('signin', data)

    def signoff(self, data):
        self.send('signoff', data)

    def message(self, from_, to, subject, detail):
        return {
            'timestamp': int(time.time() * 1000),
            'from': from_,
            'to': to,
            'subject': subject,
            'detail': detail
        }


class Desk:
    def __init__(self, config):
        self.server = HTTPServer((config['host'], config['port']), self.RequestHandler)
        self.server.config = config
        self.server.listen = self.listen
        self.dispatch(socketio.Server())

    def listen(self, port):
        self.server.listen(port)

    class RequestHandler(BaseHTTPRequestHandler):
        def do_GET(self):
            root = os.path.join(self.server.config['home'])
            if self.path == '/':
                filename = root + '/index.html'
            else:
                filename = root + self.path
            self.send_response(200)
            self.end_headers()
            self.wfile.write(open(filename, 'rb').read())

    def dispatch(self, io):
        io.on('connection', self.handle_connection)

    def handle_connection(self, socket):
        id = self.get_session_id()
        session = self.create_session(socket, id)
        if session:
            socket.on('disconnect', lambda: self.on_close_session(session, id))
        else:
            socket.disconnect()

    def on_listening(self, port):
        pass

    def on_close_session(self, session, id):
        pass

    def create_session(self, socket, id):
        pass

    def get_session_id(self):
        return str(uuid.uuid4())

