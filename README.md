# jupyterlab_shutdown

> This extension is decrepated as it was introduced in JupyterLab >=0.34.6

A `Quit` entry in File menu.

This extension is based on https://github.com/jupyter/notebook/pull/3004 .
Warning: It does not use the option `NotebookApp.shutdown_button` introduce 
for the classical notebook as JupyterLab separates more the frontend and the backend.
See https://github.com/jupyterlab/jupyterlab/issues/2790 .

![quit](demo_quit.gif)

## Prerequisites

* JupyterLab

## Installation

```bash
jupyter labextension install @fcollonval/jupyterlab_shutdown
```

## Development

For a development install (requires npm version 4 or later), do the following in the repository directory:

```bash
npm install
npm run build
jupyter labextension link .
```

To rebuild the package and the JupyterLab app:

```bash
npm run build
jupyter lab build
```

