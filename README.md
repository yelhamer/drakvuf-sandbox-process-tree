# drakvuf-sandbox-process-tree
This repository contains the dev environment for the process tree submitted to the DRAKVUF-sandbox repository.

To run this react component, simply clone the repository then do:

```bash
$ npm install
```

Followed by:
```bash
$ npm start
```

The report used in here is from a malware sample (sha256: 93b2d1840566f45fab674ebc79a9d19c88993bcb645e0357f3cb584d16e7c795). The PR over at the DRAKVUF-sandbox repository has the code for fetching the JSON report file from the backend.

The files and registry keys were also embedded in the code instead of loading the associated JSONL files (`filetracer.log` and `regmon.log`) in order to simplify things.
