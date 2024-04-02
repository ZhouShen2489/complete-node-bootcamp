const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not read the file!😭');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write file😭');
      resolve('Success');
    });
  });
};

// async automatically return a promise
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);
    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    // put three images together once they all resolved
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const allImgs = all.map((el) => el.body.message);
    console.log(allImgs);
    await writeFilePro('dog-img.txt', allImgs.join('\n'));
    console.log('Random Dog Image saved to file!');
  } catch (err) {
    console.log(err);
    throw err; // throw a err before return anything
  }
  return '2: Ready 🐶';
};

// Uses async/await to apply async/await
(async () => {
  try {
    console.log('1: Getting dog pic...');
    const x = await getDogPic();
    console.log(x);
    console.log('3: Done getting dog pic!');
  } catch (err) {
    console.log('Error 💥');
  }
})();

/*
// Use then, catch to apply async/await
console.log('1: Getting dog pic...');
getDogPic()
  .then((x) => {
    console.log(x);
    console.log('3: Done getting dog pic!');
  })
  .catch((err) => console.log('Error 💥'));
  */

/*
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro('dog-img.txt', res.body.message);
  })
  .then(() => console.log('Random Dog Image saved to file!'))
  .catch((err) => {
    console.log(err);
  });
  */
