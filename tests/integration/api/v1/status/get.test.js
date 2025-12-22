test("should return status 200 getting page /api/v1/status", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status");
    expect(response.status).toBe(200);
});
