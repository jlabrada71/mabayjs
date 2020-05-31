const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const installOS = () => asyncTask('Install OS');
const deploySoftware = () => asyncTask('Deploy software');
const runTests = () => asyncTask('Run tests');

const taskDone = name => console.log(`Completed async task: ${name}`);

const asyncTask = name => {
  console.log(`Started async task: ${name}`);
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(name), random(1, 3) * 1000);
  });
  console.log(`Returning from async task: ${name}`);
  return promise;
};

// Just proving that `await` is non-blocking: it will log 'Tick' as it awaits for the asyncTask to complete
const timer = () => setInterval(() => console.log('Tick'), 500);

const main = async () => {
  const t = timer();

  const installedOs = await installOS();
  taskDone(installedOs);

  const deployedSoftware = await deploySoftware();
  taskDone(deployedSoftware);

  const ranTests = await runTests();
  taskDone(ranTests);

  clearInterval(t);
};

main();
