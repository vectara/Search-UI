cd docker
python3 prepare_config.py ../$1
docker rm search_ui -f 2> /dev/null
docker run --platform=linux/amd64 -d  -v "/$(pwd)/.env:/usr/src/app/.env" --name search_ui --env-file .env -p 127.0.0.1:80:3000/tcp search_ui
sleep 3
open http://localhost
