const initMocks = async () => {
  if (typeof window === 'undefined') {
    console.log('msw server started.');
    const { server } = await import('./server');
    server.listen();
    return;
  }

  console.log('msw worker started.');
  const { worker } = await import('./browser');
  worker.start().catch((err) => console.error(err));
};

initMocks().catch((err) => console.error(err));

export {};
