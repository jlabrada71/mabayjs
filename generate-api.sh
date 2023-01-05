if ["$1" == ""] 
then
  echo "usage: ./generate-api.sh <model>   (don't include .yml)"
else
  node generate.js models/juanlabrada/$1.yml ./templates/create ./templates/create/nodejs/lib/manifesto.json ./output
  node generate.js models/juanlabrada/$1.yml ./templates/create ./templates/create/nodejs/route-reg/manifesto.json ./output
  node generate.js models/juanlabrada/$1.yml ./templates/create ./templates/create/nodejs/routes/manifesto.json ./output
  node generate.js models/juanlabrada/$1.yml ./templates/create ./templates/create/api-client/manifesto.json ./output
fi