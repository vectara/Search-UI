# Vectara's Search UI Sample App

## Introduction

This repository includes an open source search user interface.
Written in React, it demonstrates how to utilize [Vectara](www.vectara.com) for semantic search.

The project is designed to be used within a docker container (see Dockerfile).
Each instance is controlled by a YAML configuration file, usually in the "config" folder, which specifies important parameters:
* corpus_id: the ID of the corpus as shown in the Vectara console
* customer_id: your customer ID
* auth_api_key: the API key configured in the Vectara console. 
* 4 strings controlling the display at the top of the search box: search_title_pre, search_title_inner, search_title_post and search_title_url. The overall title is composed as follows: <search_title_per> <search_title_inner> <search_title_post>, where the search_title_inner has the text with he URL
* 4 pre-configured search queries displayed below the search box, that a user can click on: Q1, Q2, Q3 and Q4

We provided an example configuration file called "XXX-search.yaml" with all the necessary fields. You can use that as a template to start off with your search.

## How to run locally
To run the search UI locally, perform the following steps:
1. Make sure you have [docker installed](https://docs.docker.com/engine/install/) on your machine. 
2. pull this repo into a local folder using `git clone https://github.com/vectara/Search-UI.git`
3. enter the folder by `cd Search-UI`
4. Run `sh docker/build.sh` to build the docker container.
5. Run `sh docker/run.sh config/<config-file>.yaml` to configures it with the parameters specified in your configuration file. This then starts up the docker container and opens up `localhost:80` in your browser so you can try some queries.

Here is an example of how the search box looks like:
![Search box](img/box.png?raw=true "Search Box")

And after submitting a search query, the results look like this:
![Search Results](img/results.png?raw=true "Search Results")

After the docker container has started, you can:
1. View logs by using `docker logs -f search_ui`
2. Stop the container with `docker stop search_ui`

## How to run on a cloud platform
The Search UI can be easily deployed on any cloud platform such as AWS, Azure or GCP.
1. Create your configuration file for the project under the *config* folder
2. Run `python3 prepare_config.py <config_file_name>` to generate the .env file
3. run `sh docker/build.sh` to build the docker container.
4. Push the docker to the cloud specific docker container registry:
   * For AWS, follow the instructions [here](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/docker-basics.html)
   * For Azure follow the instructions [here](https://learn.microsoft.com/en-us/azure/container-apps/get-started-existing-container-image-portal?pivots=container-apps-private-registry)
   * For GCP, follow the instructions [here](https://cloud.google.com/run/docs/quickstarts/build-and-deploy)
5. Launch the container on a VM instance based on the docker image now hosted in your cloud environment. 

