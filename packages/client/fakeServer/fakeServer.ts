


class FakeServerImpl {
    constructor() {
        console.log('FakeServer initialized');
    }

    async fetch() {}
}

export const fakeServer = new FakeServerImpl();