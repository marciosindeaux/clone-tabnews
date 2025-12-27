test("should return status 200 getting page /api/v1/healthcheck", async () => {
    const response = await fetch("http://localhost:3000/api/v1/healthcheck");

    const responseBody = await response.json();
    console.log(responseBody);
    expect(response.status).toBe(200);
    expect(responseBody.application).toBeDefined();
    expect(responseBody.application).toBe("OK");
    expect(responseBody.updated_at).toBeDefined();
});
