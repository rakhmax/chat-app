SERVER_ENV=./server/.env
CLIENT_ENV=./client/.env

if [ ! -f "$SERVER_ENV" ]; then
    {
        echo "KOA_APP_PORT=8080"
    } > $SERVER_ENV
    echo "$SERVER_ENV has been generated. Fill it with correct credentials."
else
    echo "$SERVER_ENV exists."
fi

if [ ! -f "$CLIENT_ENV" ]; then
    {
        echo "REACT_APP_API_URI=http://localhost:8080"
    } > $CLIENT_ENV
    echo "$CLIENT_ENV has been generated. Fill it with correct credentials."
else
    echo "$CLIENT_ENV exists."
fi
