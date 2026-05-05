import { ElementoAction } from '.';
import { Referencia } from '../../elemento';
import { SubstituicaoTermo } from '../../emenda/emenda';

export const MODIFICAR_PARTE_DE_DISPOSITIVO = 'MODIFICAR_PARTE_DE_DISPOSITIVO';

export class ModificarParteDeDispositivoAction implements ElementoAction {
  descricao = 'Modificar parte de dispositivo';

  execute(atual: Referencia, _conteudo?: string, _novo?: Referencia, ...outros: any[]): any {
    const [substituicaoTermo] = outros as [SubstituicaoTermo];

    return {
      type: MODIFICAR_PARTE_DE_DISPOSITIVO,
      atual,
      substituicaoTermo,
    };
  }
}

export const modificarParteDeDispositivo = new ModificarParteDeDispositivoAction();
