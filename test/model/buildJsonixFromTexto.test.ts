import { expect } from '@open-wc/testing';
import { buildJsonixFromTexto } from '../../src/model/lexml/documento/conversor/buildJsonixFromProjetoNorma';

describe('buildJsonixFromTexto punctuation preservation', () => {
  it('should preserve semicolon after link', () => {
    const input = '<a href="urn:lex:br:brasil:uniao:lei:1979;6766">Lei federal nº 6.766, de 19 de dezembro de 1979</a>;';

    // Based on the function implementation, it should return an array containing:
    // 1. The span object
    // 2. The remaining text (the semicolon)

    const output = buildJsonixFromTexto(input);

    // Verify the output structure
    expect(output).to.be.an('array');
    expect(output.length).to.equal(2);
    expect(output[1]).to.equal(';');
  });
});
