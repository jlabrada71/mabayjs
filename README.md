Introduction
==================

95% of the time we end up writing boilerplate code, where the main differences are the type of data, the business model, the entity names or the technologies involved. I created this project to shortcut on this. Just generate all that boilerplate code based on a model. It has worked for me so far. It might also work for you.

Why Mabayjs? Mabay is a forgotten town in the outskirts of Bayamo in Cuba, full of gentle people and where life moves at a slow pace quite different from the stress of the city. In that town, my mother was born and grown.

Before getting deep into the details you might want to have a quick start about how the generation process works.
[Quick Start](/QUICK-START.md)


Requirements
---------------------
Node version 16+

Download and Install
---------------------

For running the MabayJS Project you just need to download and install 

Open a console and clone the github project
```
git clone https://github.com/jlabrada71/mabayjs.git
cd mabayjs
npm run install
```

Now, the project is ready for using.
The script expects to be run in bash or zsh shells. In this case of errors related to command not found or error, verify you have the shell installed or install and config any of theses supported shells.
Also, you might receive some permissions message error. This could happen to any .sh file. In this case just do chmod +x <filename> to fix the issue.


Generate full code
==================
  
    generate.js

The generate.js script allows to generate a set of files based on a model, a set of templates and a manifesto file 

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


Model file structure
=========================

The model file describes the model that is intended to be generated. This description is done based on the building blocks of Domain Driven Design.

The model file is divided in three main sections:
 - aggregates
 - entities
 - value-objects
 - primitives

 *Aggregate* is a pattern in Domain-Driven Design. A DDD aggregate is a cluster of domain objects that can be treated as a single unit. An example may be an order and its line-items, these will be separate objects, but it's useful to treat the order (together with its line items) as a single aggregate. For more details see the [Domain-Driven Design book](https://www.amazon.com/gp/product/0321125215/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0321125215&linkCode=as2&tag=martinfowlerc-20)

*Entity* is an object primarily defined by its identity is called an Entity. They are not fundamentally defined by their attributes, but rather by a thread of continuity and identity. When you think of an Entity, imagine something that needs to be tracked over time and whose attributes are likely to change over time. In order to be able to keep track of something you need a way of identifying the object and answer the question "Is this the same object?" after time has passed. For more details see the [Domain-Driven Design book](https://www.amazon.com/gp/product/0321125215/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0321125215&linkCode=as2&tag=martinfowlerc-20)

*Value-object* have no conceptual identity. These objects describe some characteristics of a thing. An object that represents a descriptive aspect of the domain with no conceptual identity is called a Value Object. Value Objects are instantiated to represent elements of the design that we care about only for what they are, not who or which they are. For example: address, email, currency, unit.

*Primitive* exits in this model to differenciate compounded value-object from single value value-objects. For example: name, age.

Currently supported data types:
------------------------------

*id*: for entity identifiers, these are expected to be unique in the system

*string*: For short strings

*text*: For long strings. The difference between both, text and string, is basically to differenciate when we want to use simple inputs from text areas in a web page.

*long*: For working with integer values

*double*: for working with foat values

*date*: for working with date values


Example structure:
--------------------

```
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

    value-objects:
        email:
          user: name
          domain: name
        
    primitives:
        id:
        type: long
        name: 
        type: string
        text:
        type: string
        date: 
        type: date
```

Manifesto file structure
===============================
The manifesto file is a descriptions of a file generation process. It describes the extension of the files to be generated, how to name the file based on different parameters. ex: entityName and usecase.

It describes the tecnology related to the templates, to allow generate for different technologies.

It also describes the different use cases that are covered by the templates, and where the templates for these use cases can be found.
A final file can contain multiple contexts that need to be generated by its own templates. For example: a vue file usually has a html, a script, and style context. In these cases where the final file requires several generation steps the context composite template describes how they need to be mixed. Also, the 'contexts' section lists the contexts required for building the final file.

The generation strategy describes the process to use for generating the final files. Most of the time you will use 'singleAggregate' which tells teh process that in the final file the code is related to only one aggregates. But in those cases where the final file can reference more than one aggregate you will need to use the 'combinedAggregate' strategy. This strategy performs several passes through the generation process for each aggregate. 90% of the time you will be fine with the 'singleAggregate' strategy.

Finally, the primitives section describe which template should be used for each type of primitive to be used in the generation process.


manifesto.json
```
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
```
Create templates from sample code
=================================

Creating templates could be a tiresome task. The generate_template.js script makes this task easy. It uses an existing sampleFile (from a project you have already finished), to create new templates. You just need to provide the path to the sampleFile and the related parameters, and the script automatically generates the template. It might require small fixes after this is finished.

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

The previous scripts are intended for using to generate projects from scratch. But some times you want to add new functionality to existing files. The file-modifier.js script is designed for this task. It is based in the same idea of generate.js but focused on adding functionality to existing files. 


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
The config.json file describes how the text subtitutions should take place.

name : The name of the template
variableTemplate: The templated used to generate the new code.
variableTemplateMark: What needs to be replaced in the template.
fileMark: What needs to be found out in the file and replaced by the template instanced.
```
    {
  "templates":[
    {
      "name": "state",
      "variableTemplate": " state: {\n    ${variableName}: null,\n",
      "variableTemplateMark": "${variableName}",
      "fileMark": " state: {\n"
    },
}

```


Comments and Issues [here](https://github.com/jlabrada71/mabayjs/issues/new)
===========================================================================