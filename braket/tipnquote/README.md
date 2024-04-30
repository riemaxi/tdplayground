# Braket Solution

## Overview
This Braket solution leverages the Braket design pattern, which divides functionality into 'Bra', 'Ket', and 'Glue' components to enhance frontend architecture. The example demonstrates interaction with network services to fetch and display quotes and tips dynamically, with a server-side component handling API requests.

## Project Structure
### Public Folder
Contains the frontend components:
- `bra.js`: Handles network requests and receives data from the server.
- `ket.js`: Manages UI interactions, updates content based on user actions and received data.
- `glue.js`: Mediates between the Bra and Ket components, managing data flow.
- `index.html`: The main HTML document that hosts the UI and script links.

### Server.js
Located at the root, adjacent to the `public` folder, this is an Express server that:
- Serves the files from the `public` folder.
- Provides endpoints for fetching random quotes and tips.

## How to Use
1. **Installation**:
   - Ensure Node.js is installed on your system.
   - Install Express by running `npm install express` in your project directory.
2. **Running the Server**:
   - Navigate to the root directory where `server.js` is located.
   - Start the server with `node server.js`.
   - The server will listen on port 8787 and can be accessed at `http://localhost:8787`.
3. **Interacting with the Application**:
   - Open `index.html` in a browser to view the application.
   - Click the "Pet's quote" or "Food's tip" buttons to fetch data from the server and see the UI update dynamically.

## Dependencies
- **Express**: For serving the static files and handling API requests.
- Modern web browsers with ES6 module support for running the frontend scripts.

## Server API
- `GET /quote/:subject` - Returns a random quote based on the specified subject.
- `GET /tip/:subject` - Returns a random tip based on the specified subject.

## Features
- **Dynamic UI Updates**: The UI updates dynamically based on server responses.
- **Modular Architecture**: Implements the Braket design pattern, simplifying maintenance and scalability.
- **Server-Client Interaction**: Server setup to handle requests and serve responses, enhancing the dynamic capabilities of the frontend.

## Contributing
We welcome contributions to enhance this project further. Please ensure that any changes maintain the integrity of the modular structure and provide clear documentation of your additions.
