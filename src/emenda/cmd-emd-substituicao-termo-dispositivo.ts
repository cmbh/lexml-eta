import { Dispositivo } from '../model/dispositivo/dispositivo';
import { NomeComGenero } from '../model/dispositivo/genero';
import { SubstituicaoTermo } from '../model/emenda/emenda';
import { StringBuilder } from '../util/string-util';
import { AgrupadorDispositivosCmdEmd } from './agrupador-dispositivos-cmd-emd';
import { CmdEmdCombinavel } from './cmd-emd-combinavel';
import { DispositivosWriterCmdEmd, TipoReferenciaAgrupador } from './dispositivos-writer-cmd-emd';

export class CmdEmdSubstituicaoDeTermoEmDispositivo extends CmdEmdCombinavel {
  constructor(protected dispositivos: Dispositivo[]) {
    super(dispositivos);
  }

  override getPrioridade(): number {
    return 5;
  }

  private getComplementoFlexoes(flexaoGenero: boolean, flexaoNumero: boolean): string {
    const flexoes: string[] = [];
    flexaoGenero && flexoes.push('gênero');
    flexaoNumero && flexoes.push('número');
    return flexoes.length ? `, fazendo-se as flexões de ${flexoes.join(' e ')} necessárias` : '';
  }

  private getSufixo(substituicaoTermo: SubstituicaoTermo): string {
    const { tipo, termo, novoTermo, flexaoGenero, flexaoNumero } = substituicaoTermo;
    const artigoDefinido = tipo.toLowerCase() === 'número' ? 'o' : 'a';
    return ` ${artigoDefinido} ${tipo.toLowerCase()} “${termo}” por “${novoTermo}”${this.getComplementoFlexoes(flexaoGenero, flexaoNumero)}`;
  }

  getTexto(_refGenericaProjeto: NomeComGenero, isPrimeiro: boolean, isUltimo: boolean): string {
    // Substitua-se, no caput do art. 5º do Projeto de Lei nº XXX/XX, a expressão “em 7 (sete) dias corridos” por “em 5 (cinco) dias corridos”.

    const sb = new StringBuilder();

    const agrupador = new AgrupadorDispositivosCmdEmd();
    const sequencias = agrupador.getSequencias(this.dispositivos);

    // Prefixo
    if (isPrimeiro) {
      sb.append('Substitua-se no ');
    } else {
      sb.append(isUltimo ? '; e ' : '; ');
      sb.append('substitua-se no ');
    }

    // Dispositivos
    const dispositivosWriter = new DispositivosWriterCmdEmd();
    //dispositivosWriter.artigoAntesDispositivo = ArtigoAntesDispositivo.DEFINIDO_COM_PREPOSICAO_A;
    dispositivosWriter.tipoReferenciaAgrupador = TipoReferenciaAgrupador.DENOMINACAO_DO_AGRUPADOR;
    sb.append(dispositivosWriter.getTexto(sequencias).trim());

    if (this.dispositivos[0].substituicaoTermo === undefined) {
      return '';
    }

    sb.append(this.getSufixo(this.dispositivos[0].substituicaoTermo));
    if (isUltimo) {
      sb.append('.');
    }

    return sb.toString();
  }
}
