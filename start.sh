SERVER_ENV=./server/.env
CLIENT_ENV=./client/.env

if [ ! -f "$SERVER_ENV" ]; then
    {
        echo "APP_PORT=8080"
        echo "APP_MONGO_URI=$1"
    } > $SERVER_ENV
    echo "$SERVER_ENV has been generated. Fill it with correct credentials."
else
    echo "$SERVER_ENV exists."
fi

if [ ! -f "$CLIENT_ENV" ]; then
    {
        echo "REACT_APP_SOCKET_URI=ws://localhost:8080"
    } > $CLIENT_ENV
    echo "$CLIENT_ENV has been generated. Fill it with correct credentials."
else
    echo "$CLIENT_ENV exists."
fi

cd client
yarn
yarn build
cd ../server
yarn
yarn build
yarn serve
