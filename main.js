const fs = require("fs/promises");

async function readCSV() {
  try {
    const data = await fs.readFile("users.csv", "utf8");

    // convert the data to an array of lines
    const lines = data.split("\r\n");

    // ignore the first line, which is the headers
    const headers = lines.shift().split(",");

    // create an array to store the user objects
    const users = [];

    // loop through the remaining lines
    lines.forEach((line) => {
      // split the line into values
      const values = line.split(",");

      // create an object from the values and headers
      const user = {};
      headers.forEach((header, i) => {
        user[header] = values[i];
      });
      // add the object to the users array
      users.push(user);
    });
    // return the users array
    return users;
  } catch (err) {
    throw err;
  }
}

async function saveToFile(users, fileName) {
  try {
    // Convert the users array to a JSON string
    const data = JSON.stringify(users, null, 2);

    // Write the string to a file
    await fs.writeFile(fileName, data, "utf8");

    console.log(`Users data has been saved to ${fileName} successfully.`);
  } catch (err) {
    throw err;
  }
}

async function readJsonFile() {
  try {
    const fileName = "output.txt";
    const data = await fs.readFile(fileName, "utf8");
    console.log(data);
  } catch (err) {
    throw err;
  }
}

async function app() {
  const users = await readCSV();

  await saveToFile(users, "output.txt");

  await readJsonFile();
}

app();
