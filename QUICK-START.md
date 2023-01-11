Introduction
-------------
Imagine we are implementing a TODO List where each item is a task and want to create a RESTful API in NodeJS using Express to store those tasks in a MongoDB database. We have already a set of templates for this task.

In order to generate the code, we need to follow two steps:
- Create a Model for the tasks.
- Run the generate-api.sh script which generates the code.

Let see in details these steps

Create a model file
------------------------
The *models* directory is the recommended place for storing models.
I'm going to create a model file and save it to the *quick-start* directory within the *models* directory.
The model will have a single aggregate *task*; a single entity *task* with three fields: *id*, *description* and *done*; and three primitives: *id* as the type for all different *id*s, *longtext* as the type for long chunks of texts like descriptions and *boolean* for logical fields like *done*.

tasks.yml

---
definitions:
  aggregates:
    - task
  entities:
    task:
      id: id      
      description: longtext
      done: boolean   

  primitives:
    id:
      type: long    
    longtext:
      type: string    
    boolean:
      type: boolean


Run the generation script 
-------------------------

Now we need to run the generation scripts. Fortunately, since generating apis is such a common task, MabayJS already comes with a specific script for this *generate-api.sh*.
Just paste the following code in the console in the root directory of MabayJS

```
./generate-api.sh tasks
```

You will see a bunch of console messages that hints what is taking place.

The Generated Code
--------------

At the end all the generated code will be stored in the *output* directory. Let check it out.

You can see that in the *output* directory there are now three new subdirectories: *routes*, *src* and *task*.

In the *routes-register* directory you can find a class intended to register routes in Express. It is expected that in some place in your main code you will create an instance of this class and call the *registerIn* method, passing the expess *app* as a parameter in order to register the api routes.
 
In the *src* directory you will find client code that allows you to call the Api. It's design using the DDD repository pattern and the proxy pattern. This code will require some modifications to suit your specific implementation.

Finally, in the *task* directory you will find the code that implements the RESTful Api. There is a *lib* directory with a repository implementation that uses MongoDB for storage. And a *routes* directory that implements the REST services.

There are two additional directories *lib* and *auth* that are helper directories for the Express JS implementation. If you are implementing the services with a different technology you might require changes.

