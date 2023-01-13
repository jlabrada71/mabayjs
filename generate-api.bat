@echo off

SET MODEL_DIRECTORY=%~2
IF "%MODEL_DIRECTORY%" == "" (
  SET MODEL_DIRECTORY=quick-start
)
SET MODEL=%~1.yml
IF "%MODEL%" == ".yml" (
  echo "usage: ./generate-api.sh <model>   (don't include .yml)"
) ELSE (
  SET MODEL=%~1.yml
  echo "using model %MODEL_DIRECTORY%/%MODEL%"
  node "generate.js" "models/%MODEL_DIRECTORY%/%MODEL%" "%CD%\templates\create" "%CD%\templates\create\nodejs\lib\manifesto.json" "%CD%\output"
  node "generate.js" "models/%MODEL_DIRECTORY%/%MODEL%" "%CD%\templates\create" "%CD%\templates\create\nodejs\route-reg\manifesto.json" "%CD%\output"
  node "generate.js" "models/%MODEL_DIRECTORY%/%MODEL%" "%CD%\templates\create" "%CD%\templates\create\nodejs\routes\manifesto.json" "%CD%\output"
  node "generate.js" "models/%MODEL_DIRECTORY%/%MODEL%" "%CD%\templates\create" "%CD%\templates\create\api-client\manifesto.json" "%CD%\output"
)
