import { expect } from '@open-wc/testing';

import { ComandoEmendaBuilder } from '../../../src/emenda/comando-emenda-builder';
import { buildProjetoNormaFromJsonix } from '../../../src/model/lexml/documento/conversor/buildProjetoNormaFromJsonix';
import { ProjetoNorma } from '../../../src/model/lexml/documento/projetoNorma';
import { DefaultState, State } from '../../../src/redux/state';
import { MPV_885_2019 } from '../../doc/mpv_885_2019';
import { TesteCmdEmdUtil } from '../teste-cmd-emd-util';
import { SubstituicaoTermo } from '../../../src/model/emenda/emenda';

let documento: ProjetoNorma;
const state: State = new DefaultState();

describe('Cabeçalho de comando de emenda com substituição de termo em dispositivo', () => {
  beforeEach(function () {
    documento = buildProjetoNormaFromJsonix(MPV_885_2019, true);
    state.articulacao = documento.articulacao;
  });

  it('alteracaoDeExpressao', () => {
    const substituicaoTermo = new SubstituicaoTermo();
    substituicaoTermo.tipo = 'Expressão';
    substituicaoTermo.termo = 'o termo';
    substituicaoTermo.novoTermo = 'o novo termo';
    TesteCmdEmdUtil.modificaTermoDoDispositivo(state, 'art1_cpt', substituicaoTermo);
    const itemComandoEmenda = new ComandoEmendaBuilder(documento.urn!, state.articulacao!).getComandoEmenda().comandos[0];
    expect(itemComandoEmenda.cabecalho).to.equal('Substitua-se no art. 1º a expressão “o termo” por “o novo termo”.');
  });

  it('alteracaoDePalavra', () => {
    const substituicaoTermo = new SubstituicaoTermo();
    substituicaoTermo.tipo = 'Palavra';
    substituicaoTermo.termo = 'Palavra';
    substituicaoTermo.novoTermo = 'Outra';
    TesteCmdEmdUtil.modificaTermoDoDispositivo(state, 'art1_cpt', substituicaoTermo);
    const itemComandoEmenda = new ComandoEmendaBuilder(documento.urn!, state.articulacao!).getComandoEmenda().comandos[0];
    expect(itemComandoEmenda.cabecalho).to.equal('Substitua-se no art. 1º a palavra “Palavra” por “Outra”.');
  });

  it('alteracaoDeNumero', () => {
    const substituicaoTermo = new SubstituicaoTermo();
    substituicaoTermo.tipo = 'Número';
    substituicaoTermo.termo = '2';
    substituicaoTermo.novoTermo = '1';
    TesteCmdEmdUtil.modificaTermoDoDispositivo(state, 'art1_cpt', substituicaoTermo);
    const itemComandoEmenda = new ComandoEmendaBuilder(documento.urn!, state.articulacao!).getComandoEmenda().comandos[0];
    expect(itemComandoEmenda.cabecalho).to.equal('Substitua-se no art. 1º o número “2” por “1”.');
  });

  it('alteracaoComFlexaoDeGenero', () => {
    const substituicaoTermo = new SubstituicaoTermo();
    substituicaoTermo.tipo = 'Expressão';
    substituicaoTermo.termo = 'o termo';
    substituicaoTermo.novoTermo = 'o novo termo';
    substituicaoTermo.flexaoGenero = true;
    TesteCmdEmdUtil.modificaTermoDoDispositivo(state, 'art1_cpt', substituicaoTermo);
    const itemComandoEmenda = new ComandoEmendaBuilder(documento.urn!, state.articulacao!).getComandoEmenda().comandos[0];
    expect(itemComandoEmenda.cabecalho).to.equal('Substitua-se no art. 1º a expressão “o termo” por “o novo termo”, fazendo-se as flexões de gênero necessárias.');
  });

  it('alteracaoComFlexaoDeGenero', () => {
    const substituicaoTermo = new SubstituicaoTermo();
    substituicaoTermo.tipo = 'Expressão';
    substituicaoTermo.termo = 'o termo';
    substituicaoTermo.novoTermo = 'o novo termo';
    substituicaoTermo.flexaoNumero = true;
    TesteCmdEmdUtil.modificaTermoDoDispositivo(state, 'art1_cpt', substituicaoTermo);
    const itemComandoEmenda = new ComandoEmendaBuilder(documento.urn!, state.articulacao!).getComandoEmenda().comandos[0];
    expect(itemComandoEmenda.cabecalho).to.equal('Substitua-se no art. 1º a expressão “o termo” por “o novo termo”, fazendo-se as flexões de número necessárias.');
  });

  it('alteracaoComFlexaoDeNumero', () => {
    const substituicaoTermo = new SubstituicaoTermo();
    substituicaoTermo.tipo = 'Expressão';
    substituicaoTermo.termo = 'o termo';
    substituicaoTermo.novoTermo = 'o novo termo';
    substituicaoTermo.flexaoGenero = true;
    substituicaoTermo.flexaoNumero = true;
    TesteCmdEmdUtil.modificaTermoDoDispositivo(state, 'art1_cpt', substituicaoTermo);
    const itemComandoEmenda = new ComandoEmendaBuilder(documento.urn!, state.articulacao!).getComandoEmenda().comandos[0];
    expect(itemComandoEmenda.cabecalho).to.equal('Substitua-se no art. 1º a expressão “o termo” por “o novo termo”, fazendo-se as flexões de gênero e número necessárias.');
  });

  it('alteracaoComFlexaoDeGeneroENumero', () => {
    const substituicaoTermo = new SubstituicaoTermo();
    substituicaoTermo.tipo = 'Expressão';
    substituicaoTermo.termo = 'o termo';
    substituicaoTermo.novoTermo = 'o novo termo';
    TesteCmdEmdUtil.modificaTermoDoDispositivo(state, 'art1_cpt', substituicaoTermo);
    const itemComandoEmenda = new ComandoEmendaBuilder(documento.urn!, state.articulacao!).getComandoEmenda().comandos[0];
    expect(itemComandoEmenda.cabecalho).to.equal('Substitua-se no art. 1º a expressão “o termo” por “o novo termo”.');
  });

  it('alteracaoDoisDispositivos', () => {
    const substituicaoTermo1 = new SubstituicaoTermo();
    substituicaoTermo1.tipo = 'Expressão';
    substituicaoTermo1.termo = 'o termo';
    substituicaoTermo1.novoTermo = 'o novo termo';
    TesteCmdEmdUtil.modificaTermoDoDispositivo(state, 'art1_cpt', substituicaoTermo1);

    const substituicaoTermo2 = new SubstituicaoTermo();
    substituicaoTermo2.tipo = 'Palavra';
    substituicaoTermo2.termo = 'PaLavra';
    substituicaoTermo2.novoTermo = 'NovaPalavra';
    TesteCmdEmdUtil.modificaTermoDoDispositivo(state, 'art2_cpt', substituicaoTermo2);

    const itemComandoEmenda = new ComandoEmendaBuilder(documento.urn!, state.articulacao!).getComandoEmenda().comandos[0];
    expect(itemComandoEmenda.cabecalho).to.equal(
      'Substitua-se no art. 1º a expressão “o termo” por “o novo termo”; e substitua-se no art. 2º a palavra “PaLavra” por “NovaPalavra”.'
    );
  });

  it('alteracaoMultiplosDispositivos', () => {
    const substituicaoTermo1 = new SubstituicaoTermo();
    substituicaoTermo1.tipo = 'Expressão';
    substituicaoTermo1.termo = 'o termo';
    substituicaoTermo1.novoTermo = 'o novo termo';
    TesteCmdEmdUtil.modificaTermoDoDispositivo(state, 'art1_cpt', substituicaoTermo1);

    const substituicaoTermo2 = new SubstituicaoTermo();
    substituicaoTermo2.tipo = 'Número';
    substituicaoTermo2.termo = '3';
    substituicaoTermo2.novoTermo = '5';
    TesteCmdEmdUtil.modificaTermoDoDispositivo(state, 'art5_cpt', substituicaoTermo2);

    const substituicaoTermo3 = new SubstituicaoTermo();
    substituicaoTermo3.tipo = 'Palavra';
    substituicaoTermo3.termo = 'PaLavra';
    substituicaoTermo3.novoTermo = 'NovaPalavra';
    TesteCmdEmdUtil.modificaTermoDoDispositivo(state, 'art2_cpt', substituicaoTermo3);

    const itemComandoEmenda = new ComandoEmendaBuilder(documento.urn!, state.articulacao!).getComandoEmenda().comandos[0];
    expect(itemComandoEmenda.cabecalho).to.equal(
      'Substitua-se no art. 1º a expressão “o termo” por “o novo termo”; substitua-se no art. 2º a palavra “PaLavra” por “NovaPalavra”; e substitua-se no art. 5º o número “3” por “5”.'
    );
  });
});
