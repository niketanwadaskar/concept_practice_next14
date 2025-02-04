function handler(req: Request) {
  if (req.method !== "GET")
    return new Response("Method not allowed", { status: 405 });
  try {
    const dummyData = [
      {
        id: 1,
        name: "John Doe",
        email: "Y0t1w@example.com",
      },
      {
        id: 2,
        name: "Jane Doe",
        email: "8BZ4y@example.com",
      },
      {
        id: 3,
        name: "Next Doe",
        email: "Y0t1ww@example.com",
      },
    ];
    return new Response(JSON.stringify(dummyData), { status: 200 });
  } catch (e) {
    return new Response(`Error ${e}`, { status: 500 });
  }
}

export { handler as GET, handler as POST };
