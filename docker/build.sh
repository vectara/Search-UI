docker build -f docker/Dockerfile . --tag=search_ui:latest 

echo "Build completed!"
echo "Run: 'sh docker/run.sh config/XXX-search.yaml' (replace YAML file with your own) to run the docker container."
echo "Create your own config YAML file to search a different Vectara corpus."
