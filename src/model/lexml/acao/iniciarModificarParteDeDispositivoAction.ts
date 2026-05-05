import { ElementoAction } from '.';
import { Elemento } from '../../elemento';
import { Tipo } from '../../dispositivo/tipo';
import { TipoDispositivo } from '../tipo/tipoDispositivo';

export const INICIAR_MODIFICAR_PARTE_DE_DISPOSITIVO = 'INICIAR_MODIFICAR_PARTE_DE_DISPOSITIVO';

export class IniciarModificarParteDeDispositivoAction implements ElementoAction {
  descricao: string;
  tipoDoDispositivo: Tipo;
  constructor(tipo: Tipo) {
    this.descricao = `Modificar termo em ${tipo.descricao?.toLowerCase() ?? ''}`;
    this.tipoDoDispositivo = tipo;
  }
  execute(elemento: Elemento): any {
    return {
      type: INICIAR_MODIFICAR_PARTE_DE_DISPOSITIVO,
      tipoDoDispositivo: this.tipoDoDispositivo,
      elemento,
    };
  }
}

export const iniciarModificarTermoEmArtigo = new IniciarModificarParteDeDispositivoAction(TipoDispositivo.artigo);
