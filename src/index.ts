import { Widget } from "@phosphor/widgets";

import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import {
  Dialog, showDialog, ICommandPalette
} from '@jupyterlab/apputils';

import {
  URLExt
} from '@jupyterlab/coreutils'

import {
  IMainMenu
} from "@jupyterlab/mainmenu";

import {
  ServerConnection
} from '@jupyterlab/services';

import '../style/index.css';

/**
 * The command IDs used by the plugin.
 */
export
namespace CommandIDs {
  export
  const quit: string = 'jupyterlab_quit:quit';
};

/**
 * Helper functions
 */
function makeServerRequest(url: string, method: string, requestBody: object) : Promise<Response>{
  let request = {
    method: method,
    body: JSON.stringify(requestBody),
  };

  let setting = ServerConnection.makeSettings();
  let fullUrl = URLExt.join(setting.baseUrl, url);
  return ServerConnection.makeRequest(fullUrl, request, setting);
}

/**
 * Activate the menu extension.
 */
function activateMenuExtension(app: JupyterLab, palette: ICommandPalette, menu: IMainMenu): void {
  
  let fileMenu = menu.fileMenu;
  const category = 'Main Area';
  const { commands } = app;

  commands.addCommand(CommandIDs.quit, {
    label: 'Quit',
    caption: 'Quit JupyterLab',
    execute: () => {
      showDialog({
        title: 'Quit confirmation',
        body: 'Please confirm you want to quit JupyterLab.',
        buttons: [
          Dialog.cancelButton(),
          Dialog.warnButton({ label: 'Quit' })
        ]
      }).then( result => {
        if (result.button.accept) {
          makeServerRequest('api/shutdown', 'POST', {})
            .then((result) => {
              if (result.ok) {
                // Close this window if the shutdown request has been successful
                let body = document.createElement("div");
                body.innerHTML = `<p>You have shut down Jupyter. You can now close this tab.</p>
                  <p>To use Jupyter again, you will need to relaunch it.</p>`;
                showDialog({
                  title: "Server stopped",
                  body: new Widget({node: body}),
                  buttons: []
                });
                window.close();
              } else {
                throw new ServerConnection.ResponseError(result);
              }
            })
            .catch(data => {
              throw new ServerConnection.NetworkError(data);
            });
        }
      });
    }
  });

  // Add commands and menu items.
  [
    CommandIDs.quit
  ].forEach(command => {
    palette.addItem({ command, category });
  });
  fileMenu.addGroup([{ command: CommandIDs.quit}], 100);
}

/**
 * Initialization data for the jupyterlab_shutdown extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab_shutdown',
  autoStart: true,
  activate: activateMenuExtension,
  requires: [
    ICommandPalette,
    IMainMenu,
  ]
};

export default extension;
