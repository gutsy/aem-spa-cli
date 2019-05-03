# aem-spa-cli
A node cli to get started with the new AEM SPA editor. *Work in progress, consider this beta software.*

## System requirements

- [Java](https://www.java.com/en/download/) 1.8 or higher
- [Maven](https://maven.apache.org/) 3.5.0 or higher
- [npm](https://npmjs.com)
- Include the [Adobe Public Maven Repository](adobe-public-maven-repo) in your maven settings
- May need to also install the archetype locally from https://github.com/adobe/aem-spa-project-archetype
  - Clone the archetype project
  - In that directory run `mvn clean install archetype:update-local-catalog`
  - Then run `mvn archetype:crawl`


## Installation
`npm install -g aem-spa-cli`

## Using the CLI
Run `aem-spa create` to create a new AEM SPA editor project. Answer the questions. Have fun. 

Run `aem-spa generate component` to create a new AEM SPA editor component. Answer the questions. Have more fun. 

Run `aem-spa help` to see the helpful menu.

Run `aem-spa version` to see the currently installed version.



