import { PhonenumPipe } from './phonenum.pipe';

describe('PhonenumPipe', () => {
  it('create an instance', () => {
    const pipe = new PhonenumPipe();
    expect(pipe).toBeTruthy();
  });
});
