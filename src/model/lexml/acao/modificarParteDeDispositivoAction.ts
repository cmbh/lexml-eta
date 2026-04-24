import { ElementoAction } from '.';
import { Elemento } from '../../elemento';
import { Tipo } from '../../dispositivo/tipo';
import { TipoDispositivo } from '../tipo/tipoDispositivo';

export const MODIFICAR_PARTE_DE_DISPOSITIVO = 'MODIFICAR_PARTE_DE_DISPOSITIVO';

export class ModificarParteDeDispositivo implements ElementoAction {
  descricao: string;
  tipoDoDispositivo: Tipo;
  constructor(tipo: Tipo) {
    this.descricao = `Modificar termo em ${tipo.descricao?.toLowerCase() ?? ''}`;
    this.tipoDoDispositivo = tipo;
  }
  execute(elemento: Elemento): any {
    return {
      type: MODIFICAR_PARTE_DE_DISPOSITIVO,
      tipoDoDispositivo: this.tipoDoDispositivo,
      elemento,
    };
  }
}

export const modificarTermoEmArtigo = new ModificarParteDeDispositivo(TipoDispositivo.artigo);
