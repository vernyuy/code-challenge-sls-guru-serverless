	
const create = require('../src/createItem');
const deleteItem = require('../src/deleteItem');
const getItem = require('../src/getItem');

test("create weather", async () => {
    const result = await create.handler({
      body: JSON.stringify({
        weather: "hot",
        town: "Douala",
        country: "Cameroon",
        temperature: "27 deg"
      }),
    });

    expect(typeof result.statusCode).toBe('number');
    expect(typeof result.body).toBe('string');
  });

  test("delete weather", async () => {
    const result = await deleteItem.handler({
      pathParameters: {
        id: 1
      }
    });

    expect(typeof result.statusCode).toBe('number');
    expect(typeof result.body).toBe('string');
  });

  test("get weather", async () => {
    const result = await getItem.handler({
      pathParameters: {
        id: 1
      }
    });

    expect(typeof result.statusCode).toBe('number');
    expect(typeof result.body).toBe('string');
  });