import { customElement, state } from 'lit/decorators.js';
import { LitElement, html, TemplateResult } from 'lit';
import { rootStore } from '../../redux/store';
import { modificarParteDeDispositivo } from '../../model/lexml/acao/modificarParteDeDispositivoAction';
import { SubstituicaoTermo } from '../../model/emenda/emenda';

export async function modificarParteDeDispositivoDialog(eventGlobal: any): Promise<any> {
  const $dialogElem = document.createElement('sl-dialog');
  document.body.appendChild($dialogElem);
  $dialogElem.label = `Modificar termo em ${eventGlobal.action.tipoDoDispositivo.name}`;
  $dialogElem.addEventListener('sl-request-close', (event: any) => {
    if (event.detail.source === 'overlay') {
      event.preventDefault();
    }
  });

  const $substituicaoTermo = new SubstituicaoTermoComponent();
  $substituicaoTermo.addEventListener('salvar', e => {
    const event = e as CustomEvent<SubstituicaoTermo>;
    const substituicaoTermo: SubstituicaoTermo = event.detail;

    rootStore.dispatch(modificarParteDeDispositivo.execute(eventGlobal.action.elemento, undefined, undefined, substituicaoTermo));
    $dialogElem.hide();
  });

  $substituicaoTermo.addEventListener('cancelar', () => {
    $dialogElem.hide();
  });

  await $dialogElem.appendChild($substituicaoTermo);
  await $dialogElem.show();
}

@customElement('lexml-cmbh-substituicao-termo')
class SubstituicaoTermoComponent extends LitElement {
  @state() tipoSubstituicaoTermo = 'Expressão';
  @state() termoASerSubstituido = '';
  @state() novoTermo = '';
  @state() flexaoGenero = false;
  @state() flexaoNumero = false;

  @state() termoASerSubsituidoRequired = false;
  @state() novoTermoRequired = false;

  createRenderRoot(): any {
    return this;
  }

  private handleSalvar() {
    this.termoASerSubsituidoRequired = !this.termoASerSubstituido;
    this.novoTermoRequired = !this.novoTermo;

    if (this.termoASerSubsituidoRequired || this.novoTermoRequired) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent('salvar', {
        detail: {
          tipo: this.tipoSubstituicaoTermo,
          termo: this.termoASerSubstituido,
          novoTermo: this.novoTermo,
          flexaoGenero: this.flexaoGenero,
          flexaoNumero: this.flexaoNumero,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleCancelar() {
    this.dispatchEvent(
      new CustomEvent('cancelar', {
        bubbles: true,
        composed: true,
      })
    );
  }

  render(): TemplateResult {
    return html`
      <div class="substituicao-de-termo-dialog">
        <fieldset>
          <sl-radio-group
            id="tipoSubstituicaoTermo"
            .value=${this.tipoSubstituicaoTermo}
            @sl-change=${(e: any) => {
              this.tipoSubstituicaoTermo = e.target.value;
            }}
          >
            <sl-radio value="Expressão">Expressão</sl-radio>
            <sl-radio value="Palavra">Palavra</sl-radio>
            <sl-radio value="Número">Número</sl-radio>
          </sl-radio-group>

          <div>
            <sl-input
              id="termoASerSubstituido"
              type="text"
              label="Termo a ser substituído: *"
              .value=${this.termoASerSubstituido}
              @sl-input=${(e: any) => {
                this.termoASerSubstituido = e.target.value;
              }}
            ></sl-input>

            ${this.termoASerSubsituidoRequired ? html`<span class="alerta">Este campo deve ser preenchido</span>` : ''}
          </div>

          <div>
            <sl-input
              id="novoTermo"
              type="text"
              label="Novo termo: *"
              .value=${this.novoTermo}
              @sl-input=${(e: any) => {
                this.novoTermo = e.target.value;
              }}
            ></sl-input>

            ${this.novoTermoRequired ? html`<span class="alerta">Este campo deve ser preenchido</span>` : ''}
          </div>

          <div class="fieldFlexaoGenero">
            <span>Propor fazer flexões de:</span>
            <div>
              <sl-checkbox
                id="flexaoGenero"
                ?checked=${this.flexaoGenero}
                @sl-change=${(e: any) => {
                  this.flexaoGenero = e.target.checked;
                }}
              >
                Gênero
              </sl-checkbox>

              <sl-checkbox
                id="flexaoNumero"
                ?checked=${this.flexaoNumero}
                @sl-change=${(e: any) => {
                  this.flexaoNumero = e.target.checked;
                }}
              >
                Número
              </sl-checkbox>
            </div>
          </div>
        </fieldset>

        <div class="botoes">
          <input type="button" value="Salvar" @click=${this.handleSalvar} />
          <input type="button" value="Cancelar" @click=${this.handleCancelar} />
        </div>
      </div>
    `;
  }
}
