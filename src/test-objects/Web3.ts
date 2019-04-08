export class MockWeb3 {
    call() {
        return Promise.resolve(true)
    };

    sendTransaction() {
        return Promise.resolve(true)
    };
}

export const transactionObject = {
    from: undefined,
    gas: 6721975,
    gasPrice: 0
  };