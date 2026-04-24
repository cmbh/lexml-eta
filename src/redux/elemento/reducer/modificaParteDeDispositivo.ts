import { State, StateType } from '../../state';
import { getDispositivoFromElemento, criaListaElementosAfinsValidados, createElemento } from '../../../model/elemento/elementoUtil';
import { DescricaoSituacao } from '../../../model/dispositivo/situacao';
import { DispositivoModificado } from '../../../model/lexml/situacao/dispositivoModificado';
import { TipoMensagem } from '../../../model/lexml/util/mensagem';
import { Eventos } from '../evento/eventos';
import { buildEventoAtualizacaoElemento, buildUpdateEvent } from '../evento/eventosUtil';
import { buildPast } from '../util/stateReducerUtil';
import { SubstituicaoTermo } from '../../../model/emenda/emenda';

export const modificaParteDeDispositivoIniciar = (state: any, action: any): State => {
  const result = { ...state };
  result.ui = {
    events: [
      {
        stateType: StateType.ModificaParteDeDispositivo,
        action,
      },
    ],
  };
  return result;
};

const descricaoDaMudanca = (substituicaoTermo: SubstituicaoTermo): string => {
  const { tipo, termo, novoTermo, flexaoGenero, flexaoNumero } = substituicaoTermo;
  const artigoDefinido = tipo.toLowerCase() === 'número' ? 'o' : 'a';
  return `Será substituído no dispositivo ${artigoDefinido} ${tipo.toLowerCase()} “${termo}” por “${novoTermo}”${getComplementoFlexoes(flexaoGenero, flexaoNumero)}.`;
};

const getComplementoFlexoes = (flexaoGenero: boolean, flexaoNumero: boolean): string => {
  const flexoes: string[] = [];
  flexaoGenero && flexoes.push('gênero');
  flexaoNumero && flexoes.push('número');
  return flexoes.length ? `, fazendo-se as flexões de ${flexoes.join(' e ')} necessárias` : '';
};

export const modificaParteDeDispositivo = (state: any, action: any): State => {
  const dispositivo = getDispositivoFromElemento(state.articulacao, action.atual, true);

  if (dispositivo === undefined || dispositivo.situacao?.descricaoSituacao !== DescricaoSituacao.DISPOSITIVO_ORIGINAL) {
    state.ui.events = [];
    return state;
  }

  const original = createElemento(dispositivo);
  dispositivo.situacao = new DispositivoModificado(original);
  //dispositivo.texto = "teste";
  dispositivo.substituicaoTermo = action.substituicaoTermo;

  const eventosUi = new Eventos();

  const elemento = createElemento(dispositivo, true);
  elemento.mensagens = [
    {
      tipo: TipoMensagem.INFO,
      descricao: descricaoDaMudanca(action.substituicaoTermo),
    },
  ];

  eventosUi.add(StateType.ElementoModificado, [elemento]);
  eventosUi.add(StateType.ElementoValidado, criaListaElementosAfinsValidados(dispositivo));
  eventosUi.add(StateType.ElementoSelecionado, [elemento]);

  const eventos = buildEventoAtualizacaoElemento(dispositivo);

  return {
    articulacao: state.articulacao,
    modo: state.modo,
    past: buildPast(state, buildUpdateEvent(dispositivo, original)),
    present: eventos.build(),
    future: [],
    ui: {
      events: eventosUi.build(),
      alertas: state.ui?.alertas,
    },
  };
};
