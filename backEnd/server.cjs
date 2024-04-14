// #!/usr/bin/env node

// const { program } = require('commander');
// const { prompt } = require('enquirer');
// const fs = require('fs');
// const path = require('path');
// const Handlebars = require('handlebars');

// // Define the templates directory
// const templatesDir = path.join(__dirname, 'templates');

// // Command to create a new web app
// program
//   .command('create-app')
//   .description('Create a new JavaScript web app')
//   .action(async () => {
//     // Prompt user for project name
//     const { name } = await prompt({
//       type: 'input',
//       name: 'name',
//       message: 'Enter a name for your project:'
//     });

//     // Prompt user for framework choice
//     const { framework } = await prompt({
//       type: 'select',
//       name: 'framework',
//       message: 'Choose a framework:',
//       choices: ['React', 'Vue.js', 'Angular']
//     });

//     // Prompt user for run command
//     const { runCommand } = await prompt({
//       type: 'input',
//       name: 'runCommand',
//       message: 'Enter the run command for your frontend app:'
//     });

//     // Read the template file based on the chosen framework
//     const templateFile = path.join(templatesDir, `${framework.toLowerCase()}-app/package.hbs`);
//     const templateContent = fs.readFileSync(templateFile, 'utf8');

//     // Compile the Handlebars template
//     const template = Handlebars.compile(templateContent);

//     // Define data for the template
//     const data = {
//       name,
//       runCommand
//     };

//     // Generate the project files by applying the template
//     const generatedFiles = template(data);

//     // Write the generated files to disk
//     const outputDir = path.join(process.cwd(), name);
//     fs.mkdirSync(outputDir);
//     fs.cpSync(`./templates/${framework.toLowerCase()}-app`, `./${name}`, { recursive: true });

//     console.log('Project created successfully!');
//   });

// // Parse command-line arguments
// program.parse(process.argv);

const axios = require('axios')
const jwt = require('jsonwebtoken')

const accessKey = {
  developer_id: "87ba32f4-6b38-4329-8ce9-eb88533a1316",
  key_id: "d8efd0ed-f3f4-4d55-9b7b-d09e03d865bd",
  signing_secret: "CeZu2UmF-X1l4lFq815B77BRDDt2i_CWOM-1r4QfXJ0"
}

const data = {
  aud: 'doordash',
  iss: accessKey.developer_id,
  kid: accessKey.key_id,
  exp: Math.floor(Date.now() / 1000 + 300),
  iat: Math.floor(Date.now() / 1000),
}

const headers = { algorithm: 'HS256', header: { 'dd-ver': 'DD-JWT-V1' } }

const token = jwt.sign(
  data,
  Buffer.from(accessKey.signing_secret, 'base64'),
  headers,
)

const body = JSON.stringify({
  external_delivery_id: 'D-12345',
  pickup_address: '901 Market Street 6th Floor San Francisco, CA 94103',
  pickup_business_name: 'Wells Fargo SF Downtown',
  pickup_phone_number: '+16505555555',
  pickup_instructions: 'Enter gate code 1234 on the callbox.',
  dropoff_address: '901 Market Street 6th Floor San Francisco, CA 94103',
  dropoff_business_name: 'Wells Fargo SF Downtown',
  dropoff_phone_number: '+16505555555',
  dropoff_instructions: 'Enter gate code 1234 on the callbox.',
  order_value: 1999,
})

axios
  .post('https://openapi.doordash.com/drive/v2/deliveries', body, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  })
  .then(function (response) {
    console.log(response.data)
  })
  .catch(function (error) {
    console.log(error)
  })