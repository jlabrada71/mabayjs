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

    node generate.js article-model.yml ./templates ./templates/vue-vuetify/app-routes/manifesto.json ./output

**Generate vuetify CRUD files:** 

    node generate.js article-model.yml ./templates ./templates/vue-vuetify/manifesto.json ./output

**Generate api-client files:**

    node generate.js article-model.yml ./templates ./templates/api-client/manifesto.json ./output

**Generate nodejs lib files:**  

    node generate.js article-model.yml ./templates ./templates/nodejs/lib/manifesto.json ./output

**Generate nodejs route-registration files:**  

    node generate.js article-model.yml ./templates ./templates/nodejs/lib/manifesto.json ./output

**Generate nodejs routes files:**  

    node generate.js article-model.yml ./templates ./templates/nodejs/routes/manifesto.json ./output

**Generate nodejs routes files:**  

    node generate.js article-model.yml ./templates ./templates/nodejs/routes/manifesto.json ./output    

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
    entities:
        
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

    generate_template.js


Add functionality to existing code
==================================

    file-modifier.js
