Before We Start
===============

Requirements
---------------------
MabayJS requires Node version 16+ and npm installed in order to run. 
To verify if node is installed run the following command in a terminal:
```
node -v
```
Which should show the node version if it is installed. In case you don't have node installed or the node version is below 16, you will need to install it.
Visit https://nodejs.org/en/ download a current version, run it and follow the instructions.
You can also install nvm (node version manager) in the case you might need specific node versions for other tasks.

Download and Install MabayJS
---------------------

For running the MabayJS Project you just need to download and install 

Open a console or a terminal window and clone the github project
```
git clone https://github.com/jlabrada71/mabayjs.git
cd mabayjs
npm run install
```

Now, the project is ready for using.
The script expects to be run in bash or zsh shells. In this case of errors related to command not found or error, verify you have the shell installed or install and config any of theses supported shells.
Also, you might receive some permissions message error. This could happen to any .sh file. In this case just do chmod +x < filename.sh > to fix the issue.


Overview
============
Imagine we are implementing a TODO List where each item is a task and you need to create a RESTful API in NodeJS using Express to store those tasks in a MongoDB database. We already have a set of templates ready for this task.

In order to generate the code, we need to follow three steps:
- Download and Install MabayJS
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


