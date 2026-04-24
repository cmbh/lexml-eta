import './autocomplete-norma';

export async function modificarParteDeDispositivoDialog(event: any): Promise<any> {
  const dialogElem = document.createElement('sl-dialog');
  document.body.appendChild(dialogElem);
  dialogElem.label = `Modificar termo em ${event.action.tipoDoDispositivo.name}`;
  dialogElem.addEventListener('sl-request-close', (event: any) => {
    if (event.detail.source === 'overlay') {
      event.preventDefault();
    }
  });

  const content = document.createRange().createContextualFragment(`
    <h1>Conteúdo</h1>
  `);

  await dialogElem.appendChild(content);
  await dialogElem.show();
}
