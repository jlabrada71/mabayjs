#!/bin/bash

MODEL_DIRECTORY=$2
if [ "$MODEL_DIRECTORY" == "" ]; then
  MODEL_DIRECTORY=quick-start
fi

MODEL=$1.yml
if [ "$MODEL" == ".yml" ]; then
  echo "usage: ./generate-api.sh <model>   (don't include .yml)"
else
  MODEL=$1.yml
  echo "using model $MODEL_DIRECTORY/$MODEL"
  node generate.js models/$MODEL_DIRECTORY/$MODEL ./templates/create ./templates/create/nodejs/lib/manifesto.json ./output
  node generate.js models/$MODEL_DIRECTORY/$MODEL ./templates/create ./templates/create/nodejs/route-reg/manifesto.json ./output
  node generate.js models/$MODEL_DIRECTORY/$MODEL ./templates/create ./templates/create/nodejs/routes/manifesto.json ./output
  node generate.js models/$MODEL_DIRECTORY/$MODEL ./templates/create ./templates/create/api-client/manifesto.json ./output
fi