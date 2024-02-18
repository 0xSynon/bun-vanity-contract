import os from 'os';

const workerURL = new URL('worker.ts', import.meta.url).href;
const cpuCount = os.availableParallelism();

interface DeploymentCandidate {
  score: number;
  pk: string;
  deployer: string;
  contract: string;
}

const best: DeploymentCandidate = {
  score: 0,
  pk: '',
  deployer: '',
  contract: '',
}

const workers = [];

for (let i = 0; i < cpuCount; i++) {
  const worker = new Worker(workerURL);
  worker.onmessage = event => {
    const { score, pk, deployer, contract } = event.data;
    if (score > best.score) {
      best.contract = contract;
      best.deployer = deployer;
      best.pk = pk;
      best.score = score;
      console.log(best);
    }
  }
}

