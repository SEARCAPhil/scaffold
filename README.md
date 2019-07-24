# Scaffold
Template for SEARCA's Information Systems

> Components, icons, pages, and other assets were copied from Contacts Web Portal.   
Please change the files as necessary 

[![Build Status](https://travis-ci.org/SEARCAPhil/scaffold.svg?branch=develop)](https://travis-ci.org/SEARCAPhil/contacts_web)

[![js-standard-style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](http://standardjs.com)

### Requirements
- Apache
- [NodeJS >= v8.9.4](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/en/docs/install#mac-tab)



### Installation
1.) Install [Contact's database API](https://github.com/SEARCAPhil/contacts_api)    

2.) Clone this repository and checkout to `develop` branch to see the latest fetures and updates
 > git clone https://github.com/SEARCAPhil/contacts_web.git   
 git checkout -b develop  


3.) Install dependencies
  > yarn install    

4.) Bundle assets
> webpack 


5.) Open your prefered browser and navigate to 
  > http://localhost/scaffold/www/


### Directory structure
|- **src (main)** - All your files must reside here  
|---**config** (API Configurations)  
|--- **assets**   
|------ css   
|------ fonts   
|------ img    
|--- **components**   
|----- **your-component** (Sample custom component)  
|--------- **actions** *(CRUD Operations)*  
|------------- create.js   
|------------- retrieve.js   
|------------- update.js   
|------------- delete.js   
|------------- [ . . . ]   
|---------- index.styl (Custom style)   
|---------- index.js (Component main entry file)   
|--- **pages** *(different pages loaded to DOM by routers)*   
|--- **services** (AJAX calls)   
|--- **routers** (Defines routing mechanism)  
|--- **utils** (*general* Classes that could be used anywhere) 

|- **www** - This will be generated after bundling the application by running 
  > webpack

## The Docker Way
### Requirements
> Note: You must have an active account in Docker to download the application

1.) [Docker](https://www.docker.com/get-started)   
2.) [Docker Compose](https://docs.docker.com/compose/install/)


### Links
* **Web APP** : http://localhost:8081  

### Installation
1.) After you cloned the repository, make sure to change your current working directory.
  > cd contacts_api

2.) Build the image

  > docker-compose up -d

3.) Get the the list of all running containers and choose the contacts_web_node
  > docker ps -a

4.) Enter the app's console
  > docker exec -ti **container_id_here** bash

5.) Change configuration in `config/` directory

6.) `npm run start` to start the web server

7.) Navigate to http://localhost:8081
> You MUST register your application in azure portal and place and change default value of 'config/msal.js' as necessary
   


**IMPORTANT**
> You might need  to change the [volume] part in `build_files/Dockerfile` depending on your Operating System.  

   
> NOTES: Docker only allow few folders that could be mounted into the volume otherwise you will receive a permission denied error and you will need to copy the whole directory for this to properly work.    
If you are using `XAMPP` in MacOS, please go to `Docker > preferences > File Sharing` and add new entry `/Applications/XAMPP/xampp/htdocs`.  
   
> You should also change the workbox configuration in webpack config file
> This project adheres on [StandardJS rules](https://standardjs.com/).   
To check, please run 'npm run check'
