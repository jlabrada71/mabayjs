Generate full code
==================

    generate.js

**Usage:** generate modelFile templatesPath manifestoFile outputPath

**modelFile**: Is a .yml file especifying the modelFile
*ex: ideal_model.yml*

**templatesPath**: Is the path where templates for generating the code are located. *ex: templates/api-client*

**manifestoFile**: Is the file that describes how the templates should be used. 

**outputPath**: Is the path where the final code is going to be generated.

Examples:
---------
**Generate vuetify routes file:**

    node generate.js models/sample/article-model.yml ./templates/create ./templates/create/vue-vuetify/app-routes/manifesto.json ./output

**Generate vuetify CRUD files:** 

    node generate.js models/sample/article-model.yml ./templates/create ./templates/create/vue-vuetify/manifesto.json ./output

**Generate api-client files:**

    node generate.js models/sample/article-model.yml ./templates/create ./templates/create/api-client/manifesto.json ./output

**Generate nodejs lib files:**  

    node generate.js models/sample/article-model.yml ./templates/create ./templates/create/nodejs/lib/manifesto.json ./output

**Generate nodejs route-registration files:**  

    node generate.js models/sample/article-model.yml ./templates/create ./templates/create/nodejs/route-reg/manifesto.json ./output

**Generate nodejs routes files:**  

    node generate.js models/sample/article-model.yml ./templates/create ./templates/create/nodejs/routes/manifesto.json ./output

**Generate nodejs routes files:**  

    node generate.js models/sample/article-model.yml ./templates/create ./templates/create/nodejs/routes/manifesto.json ./output    

Model file structure
-------------------- 

articles.yml

    ---
    definitions:
    aggregates:
        - article
        - comment
    entities:
        article:
        id: id
        title: text
        text: text
        publishDate: date
        comment: 
        id: id
        articleId: id
        text: text 
        author: name 
        email: text
        
    primitives:
        id:
        type: long
        name: 
        type: string
        text:
        type: string
        date: 
        type: date


Manifesto file structure
------------------------

manifesto.json

    {
    "ext":".vue",
    "fileNameTemplate" : "{{pascal entityName}}{{pascal usecase}}",
    "technologies":[
        "vue-vuetify"
    ],
    "useCases":[
        {"name":"form", "folder":"src/components" },
        {"name":"details", "folder":"src/components" },
        {"name":"list", "folder":"src/components" },
        {"name":"view", "folder":"src/views" }
    ],
    "entity":"entity.template",
    "contextComposite":"composite.template",
    "contexts":[
        "html",
        "script",
        "css"
    ],
    "generationStrategy" :"singleAggregate",
    "primitives":[
        {
            "key":"entity",
            "type":"entity",
            "definition":"entity.template"
        },
        {
            "key":"name",
            "type":"property",
            "definition":"name.template"
        }
    ]
    }

Create templates from sample code
=================================

    generate_template.js  <sampleFile> <entity> <templatePath> <technology> <usecase> <context> <outputpath>
    ex: node ./generate_template.js serverMiddleware/api/note/lib/note-repository.js note templates/api node repository script output

sampleFile: existing file that will be used to create the template
entity: existing entity that will be used as a base for creating the template
templatePath: folder where the template will be stored
tecnology: node, vue, react
use case: form, details, view
context: Given a technology you can use different templates for different context, ex: for Vue you can have in the same file: html, script, css, so context allows to specify for which part of the final file the template will be used.
outputPath: reserved for future use


Add functionality to existing code
==================================

    Usage: file-modifier variableName fileToModify templatesPath configFileName

    example: node file-modifier.js pruebita ./templates/modify/vuex/store/index.js ./templates/modify/vuex 

    Is recomended to modify a copy of the original file, to prevent unwanted errors.


for example with variableName 'pruebita' the 'old' code will be replaced the 'new' one.

'old' code

state {

}

'new' code 
state {
    pruebita: null

}
    
config.json
-----------
name : The name of the template
variableTemplate: The templated used to generate the new code.
variableTemplateMark: What needs to be replaced in the template.
fileMark: What needs to be found out in the file and replaced by the template instanced.

    {
  "templates":[
    {
      "name": "state",
      "variableTemplate": " state: {\n    ${variableName}: null,\n",
      "variableTemplateMark": "${variableName}",
      "fileMark": " state: {\n"
    },
}

