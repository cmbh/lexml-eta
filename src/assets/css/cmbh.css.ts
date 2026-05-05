import { html } from 'lit';

export const cmbhStyles = html`
  <style>
    .substituicao-de-termo-dialog {
      span.alerta {
        color: red;
      }

      fieldset {
        display: flex;
        flex-direction: column;
        gap: 1em;
        background-color: var(--sl-color-gray-100);
        box-shadow: var(--sl-shadow-x-large);
        flex-wrap: wrap;
        padding: 20px 20px;
        margin: 10px;
        border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
        border-radius: var(--sl-border-radius-medium);
      }

      legend {
        background-color: var(--sl-color-gray-200);
        font-weight: bold;
        border-radius: 5px;
        border: 1px solid var(--sl-color-gray-300);
        padding: 2px 5px;
        box-shadow: var(--sl-shadow-small);
      }

      sl-radio-group::part(base) {
        display: flex;
        flex-direction: row;
        gap: 20px;
      }

      #flexaoGenero {
        margin-left: 20px;
      }

      .fieldFlexaoGenero {
        display: flex;
        flex-wrap: wrap;

        div {
          display: flex;
          flex-direction: row;
          gap: 20px;
        }

        span {
          margin-bottom: 10px;
        }
      }

      .botoes {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
      }
    }
  </style>
`;
