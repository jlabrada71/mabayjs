Describe how to create new templates for react-todo project.
=============================================================
This *how-to* is based on the *how-to/react-todo* project. The original templates can be found in the *how-to/react-templates*

We will be creating template files to show how to generate React file from a model.
This tutorial covers:
- creating the templates directory structure
- creating the manifesto
- creating the templates
- creating the Notes model
- generating the React Note files.

Creating the directory structure
-------------------------------
1- The template will be for creating react files from scratch (for modifying existing files there is a different procedure)
2- Create a directory where the templates will be placed, name the directory 'react' for example.
  ```
    mkdir templates/create/react
  ```
  The *templates* directory holds all the different templates. The *create* subdirectory holds all the templates to create files from scratch. We name the new directory *react* so it will be easy to identify what technology is associated with the templates.
  
We are going to create a template for the TaskList.js file. It will allow us to generate similar files given an existing model. This file can be found in the *how-to/react-todo/src/components/tasks/* directory.

Creating the manifesto.json file
--------------------------------

Create a file name manifesto.json in the *templates/create/react* directory. This file describes which templates will be used, the associated technology, and many other parameters for generating files.

First define the 'ext' of the file that it generates. In this case '.js'
```
{
   "ext":".js",
}
```
Next define how are we going to names the files. Basically this is a pattern we are going to use. In this example for the Task entity and List use case we want to generate names like 'TaskList'. We want the names in pascal case for the entity and pascal case for the use case.

```
{
   "ext":".js",
   "fileNameTemplate" : "{{pascal entityName}}{{pascal usecase}}",
}
```
Now list the technologies associated to the templates, react in this case.

```
{
   "ext":".js",
   "fileNameTemplate" : "{{pascal entityName}}{{pascal usecase}}",
    "technologies":[
      "react"
   ],
}
```

List the use cases that will generated, in this case only the 'list' use case.

```
{
  "ext":".js",
  "fileNameTemplate" : "{{pascal entityName}}{{pascal usecase}}",
  "technologies":[
    "react"
  ],
  "useCases":[
    { "name": "list", "folder": "src/components/{{entityName}}s" },
   ],
}
```
along with the use case name, describe the folder where the file will be created. In this case see how the folder has an 's' at the end.

Define which template will be used for generating the entity, and which template will be use for generating the composite. 

Usually, is not necessary to have a composite template, only in those cases where we mix different kind of code in the same final file. For example in VueJS and React. Also, we will list the set of contexts that will be supported. In this case only 'script' since the code will be generated for Javascript.


```
{
  "ext":".js",
  "fileNameTemplate" : "{{pascal entityName}}{{pascal usecase}}",
  "technologies":[
    "react"
  ],
  "useCases":[
    { "name": "list", "folder": "src/components/{{entityName}}s" },
  ],
  "entity":"entity.template",
  "contextComposite":"composite.template",
  "contexts":[
    "script"
  ],
}
```

Now define the generation strategy. For this tutorial we will go with 'singleAggregate'. In a different document we will explain more about this since it is a complicated concept.

```
{
  "ext":".js",
  "fileNameTemplate" : "{{pascal entityName}}{{pascal usecase}}",
  "technologies":[
    "react"
  ],
  "useCases":[
    { "name": "list", "folder": "src/components/{{entityName}}s" },
  ],
  "entity":"entity.template",
  "contextComposite":"composite.template",
  "contexts":[
    "script"
  ],
  "generationStrategy" :"singleAggregate",
}
```
Finally, let's define the template for each of the primitives that will be allowed for this set of templates. We'll keep it short for the sake of brevity.

```
{
  "ext":".js",
  "fileNameTemplate" : "{{pascal entityName}}{{pascal usecase}}",
  "technologies":[
    "react"
  ],
  "useCases":[
    { "name": "list", "folder": "src/components/{{entityName}}s" },
  ],
  "entity":"entity.template",
  "contextComposite":"composite.template",
  "contexts":[
      "script"
   ],
  "generationStrategy" :"singleAggregate",
  "primitives":[
    {
        "key":"entity",
        "type":"entity",
        "definition":"entity.template"
    },
    {
        "key":"id",
        "type":"property",
        "definition":"id.template"
    },
    {
        "key":"longtext",
        "type":"property",
        "definition":"longtext.template"
    },
    {
        "key":"boolean",
        "type":"property",
        "definition":"boolean.template"
    }
   ]
}
```

With the manifest file created is time to start creating each of the templates.

Creating the template files
-------------------------------

Start by creating a file name *composite.template* in the templates/create/react directory.

In this case since the only context will be *script* the content of the file should like this:
```
{{script}}
```
 
Now create a directory for each of the use cases that this template set will generate. Since the only use case is 'list' then we will only create that directory in the templates/create/react.

Within this directory we will create one directory for each of the contexts. In our case the only context is 'script' so the final structure should look like this:

    templates/create/react/list/script

This structure allows for supporting many contexts and use cases which helps generate code for full applications. In this simple example it looks like an overkill but the purpose is to teach you all the steps involved.

In the *script* directory create a file for each of the primitives that we listed in the manifest file. In our case 4 templates.
- entity.template
- id.template
- longtext.template
- boolean.template

In the entity.template paste the content of the original file Task.list.js
Then replace each 'Task' word with '{{pascal entityName}}'
Now replace each 'task' word with '{{entityName}}'
Finally, replace the code for properties with of with {{propertiesCode}}
The entity.template should look like this:
```
import './{{pascal entityName}}List.css';

function {{pascal entityName}}ListItem({{entityName}}) {
  return <div className='class-list-row'>
    {{propertiesCode}}
  </div>
}

function {{pascal entityName}}List({ {{entityName}}List }) {
  console.log({{entityName}}List)
  return <div>
    <h1>{{pascal entityName}} List</h1>
    { {{entityName}}List.map({{pascal entityName}}ListItem) }
  </div>
}

export default {{pascal entityName}}List
```
Now for each of the primitive template create how it should look like, replacing every appearence of task.<propertyname> with {{entityDotPropertyName}}

Take into consideration that React use brackets {} for injecting variables, so leave an space between React brackets and the template brackes.

The final primitive files should look like this:

boolean.template:
```
<div>
  <input type="checkbox" defaultChecked={ {{entityDotPropertyName}} }></input>
</div>
```
id.template:
```
<div>{ {{entityDotPropertyName}} }</div>
```

longtext.template:
```
<div>{ {{entityDotPropertyName}} }</div>
```

Now is time to test our template set.

Creating the Notes model
----------------------------
We will be using the *notes.yml* model which can be found in the *models/quick-start* directory.
As can be seen in the below fragment is uses the same set of primitives as our Task file. As soon as you identify a new type of primitive to work with, the manifesto.json and the templates must be modified to reflect this.

notes.yml
```
---
definitions:
  aggregates:
    - note
  entities:
    note:
      id: id     
      title: longtext
      author: longtext
      description: longtext
      finished: boolean   

  primitives:
    id:
      type: long    
    longtext:
      type: string    
    boolean:
      type: boolean
```


Generating the files with the model
---------------------------------

For generating the files we need to run the generate.js script.
When it is run with no parameters it shows how it should be used.
```
node generate.js

node generate.js models/quick-start/notes.yml templates/create ./templates/create/react/manifesto.json ./output
```

The first parameter that it receives is the model yml file(*models/quick-start/notes.yml*), the second is in which directory we are going to find the templates(*templates/create*). The third parameter is which manifesto file describes the generation process(*./templates/create/react/manifesto.json*). And lastly, which is the directory where the resulting files will be created(*./output*).

It is recommended to create a script to short cut calling the generation file since this will be a repetitive task and you won't want to have to remember and type all the different parameters every time.

Review the *output* directory *output/src/components/notes* and you'll find the NoteList.js. Copy the *notes* directory to the *src/components* directory in the *react-todo* project. Import and tie the component in the App.js file. Add some data and see how it works.
BTW, these changes to the App.js file can also be done automatically by using a different generation strategy but that is matter for another *how-to*

If you have any issue, question or comment feel free to drop me a message or create an issue in Github.


