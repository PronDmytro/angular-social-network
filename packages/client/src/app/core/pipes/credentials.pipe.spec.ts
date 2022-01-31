import { CredentialsPipe } from './credentials.pipe';

xdescribe('CredentialsPipe', () => {
  it('create an instance', () => {
    const pipe = new CredentialsPipe();
    expect(pipe).toBeTruthy();
  });
});
