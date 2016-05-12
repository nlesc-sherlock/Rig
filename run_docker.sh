#!/bin/sh
docker run -d -p 8888:8888 --name spark -v $(PWD)/workflow:/home/jovyan/work/workflow jupyter/all-spark-notebook
