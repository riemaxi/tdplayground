import requests

url = 'http://38.242.157.162:33390/accesskey'

response = requests.get(url)
if response.status_code == 200:
    print('credentials:', response.json())
else:
    print(f'Failed to retrieve credentials. Status code: {response.status_code}')
