
# How to Define New Processes

## Generating Task Forms

Each **user task** in your BPM file should have a corresponding `[TaskName].json` form definition file.  
In addition the start process event should have a corresponding `StartProcess.json` form definition file.  

The form definition files should contain valid form.io configurations 
that is generated using [form.io form builder](https://formio.github.io/formio.js/app/builder).  

### Form.io Config Tips and Tricks

#### Form.io Select Component
If you want to lazily download the select component data, pay attention that Form.io does not send `searchText` of the select component to custom queries.  
You can only access `searchText` using the `url` type. The `searchText` will be sent as a query parameter of the url type. You can modify the parameter name using `searchField` property.  
In addition you can always use `limit` and `skip` variables for lazy loading of the data.

Take a look at the following config as an example:  
```json
{
  "type": "select",
  "key": "publisher",
  "searchField": "publisherName",
  "lazyLoad": true,
  "data": {
    "url": "../api/v1/workflow/forms-data/publishers?limit={{ limit }}&skip={{ skip }}",
    "method": "GET",
    "headers": [
      {
        "key": "authorization",
        "value": "{{form.variables.accessToken}}"
      }
    ]
  },
}
```

If the user enters "Elsevier" in the search field of the select, the following request will be made:  
`/api/v1/workflow/forms-data/publishers?publisherName=Elsevier&limit=1&skip=0`

#### Form.io Panel and Submit Button

Please don't use these :)

### Accessing Process Variables

You can access all the process instance variables from form `data` attribute: `{{ data.fundId }}`.  
We'll **only** send the variables that you access in your form config.  
__Please pay attention that process instance variables that you access in the form will visible to the form submitter__.

### Environment Variables

We define some environment variables that are accessible in the forms via the `form.variables`.  
You can find all the predefined form variables in the [getFormVariables](./src/service/wfEngine/getFormVariables.ts) file.

Here is an example usage:

```json
{
  "width": 6,
  "type": "column",
  "components": [
    {
      "type": "select",
      "key": "publisher",
      "input": true,
      "label": "Publisher",
      "validate": { "required": true },
      "data": {
        "url": "{{form.variables.apiServerAddress}}/iknito/data/publisher.json"
      },
      "dataSrc": "url",
      "template": "<span>{{item.label}}</span>"
    }
  ]
}
```
