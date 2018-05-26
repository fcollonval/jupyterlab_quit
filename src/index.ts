import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import '../style/index.css';


/**
 * Initialization data for the jupyterlab_shutdown extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab_shutdown',
  autoStart: true,
  activate: (app: JupyterLab) => {
    console.log('JupyterLab extension jupyterlab_shutdown is activated!');
  }
};

export default extension;
