@echo off

COPY  "output/routes/*" "%CD%\..\heroku\juanlabrada\routes"
COPY  "output/lib/*" "%CD%\..\heroku\juanlabrada\lib"
COPY  "output/src/components/*" "%CD%\..\heroku\juanlabrada\src\components"
COPY  "output/src/lib/*" "%CD%\..\heroku\juanlabrada\src\lib"
COPY  "output/src/router/*" "%CD%\..\heroku\juanlabrada\src\router"
COPY  "output/src/views/*" "%CD%\..\heroku\juanlabrada\src\views"
