import { OrderingPipe } from './pipes/ordering.pipe';

describe('OrderingPipe', () => {
  it('create an instance', () => {
    const pipe = new OrderingPipe();
    expect(pipe).toBeTruthy();
  });
});
