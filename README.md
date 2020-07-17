## Building a Dynamite Plugin.

The Dynamite plugin framework gives developers the ability to build their own user interfaces directly inside any of the Dynamite management UIs.

## Features
1. Leverage any HTTP method available in the REST API.
2. Automatically integrates with Dynamite management UIs' authentication/authorization system.
3. Bring whatever front-end development framework you like.

## Pre-requisites

1. You must have [Dynamite-NSM (agent (>= 0.7.2))](https://dynamite-nsm.readthedocs.io/en/latest/getting_started/agent_setup/) installed and the Agent Management UI enabled.
2. To install plugins you must have the `admin` role within the respective Dynamite management UI.


### Create a Skeleton Project

When creating a plugin the below file-structure is required.

```
name_of_my_plugin/
    |
    - manifest.json
    - icon.png
    - plugin.html
    - js/
        |
        - my_js_lib_1.js
        - my_js_lib_2.js
    - css/
        |
        - my_awesome_styles.css 
```

| File          | Description                                                                                                                        | Required     |
|---------------|------------------------------------------------------------------------------------------------------------------------------------|--------------|
| manifest.json | A `json` formatted document that enables the developer to define certain global characteristics and configuration options.         | required     |
| icon.png      | A icon for your application. For best results it is recommended you use 50x50px with a 1:1 aspect-ratio.                           | not required |
| plugin.html   | All your HTML goes here and only here. Plugins only support single page applications at the moment.                                | required     |
| js/           | This directory is used for storing any Javascript. These files are loaded in the order they are referenced in the manifest.json    | not required |
| css/          | This directory is used for storing any CSS. required. These files are loaded in the order they are referenced in the manifest.json | not required |


### Defining a `manifest.json`

The `manifest.json` defines a set of global configurations for loading your plugin.

#### Sample `manifest.json`
```json
{
  "meta": {
    "name": "Simple Process Manager",
    "description": "Start and stop all agent components: Zeek, Suricata, FileBeat. View running status and process information.",
    "version": "0.1",
    "role": "agent",
    "author": "Jamin Becker",
    "website": "https://dynamite.ai",
    "code_repo_url": "https://github.com/dynamite-nsm/"
  },
  "permissions": {
    "requires": "admin"
  },
  "toolbar": {
    "icon": "icon.png",
    "show": true
  },
  "files": {
    "javascript": [
      "event_handlers.js",
      "init.js"
    ],
    "css": [
      "style.css"
    ]
  }
}
```

| Name                 | Description                                                       | Required     |
|----------------------|-------------------------------------------------------------------|--------------|
| meta.name            | The friendly name for your plugin (shows up in displays).         | required     |
| meta.description     | The description of your plugin.                                   | required     |
| meta.version         | The version string of your plugin. (E.G 0.0.1)                    | required     |
| meta.role            | Currently "agent" is the only supported option here.              | required     |
| meta.author          | The name of the author if you care to share.                      | not required |
| meta.website         | A website associated with the plugin.                             | not required |
| meta.code_repo_url   | A link to a code repository such as github/gitlab/bitbucket       | not required |
| permissions.requires | Either "admin", "superuser", "analyst"                           | required     |
| toolbar.icon         | A relative path to the `icon.png` file.                           | not required |
| toolbar.show         | If true, renders in the navbar.                                   | not required |
| files.javascript     | A list of javascript files loaded (in order) at plugin load time. | not required |
| files.css            | A list of css files loaded (in order) at plugin load time.        | not required |


### Development and Testing.

During development you will likely want to see how your plugin looks as you build it. To accomplish this, simply move the directory you created above into `/opt/dynamite/plugins/`.

It will then be automatically loaded into your plugin manager

<p align="center">
    <img src="https://github.com/DynamiteAI/dynamite-simple-agent-process-manager-plugin/raw/master/tutorial/plugin-manager.png"  width="90%" height="auto">
</p>

Now any changes made to files referenced within your `manifest.json` will be rendered within your new plugin!

### Packaging

Once you are satisfied with your plugin, `zip` it and attempt to install it through the plugin-manager.
