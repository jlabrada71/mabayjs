MODEL=$1
# quick-start/messages

node generate.js models/$MODEL.yml templates/nestjs-api/create templates/nestjs-api/create/manifesto.json ./output
node generate.js models/$MODEL.yml templates/nestjs-api/create templates/nestjs-api/create/manifesto-schemas.json ./output
node generate.js models/$MODEL.yml templates/nestjs-api/create templates/nestjs-api/create/manifesto-dto.json ./output
node generate.js models/$MODEL.yml templates/nestjs-api/create templates/nestjs-api/create/manifesto-entities.json ./output