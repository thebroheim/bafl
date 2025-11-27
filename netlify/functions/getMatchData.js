export async function handler() {
  try {
    const url =
      "https://sheets.googleapis.com/v4/spreadsheets/1eAhYqy0og9IEGeijDHTxvCnpQN8MD1v1FmE1TTDNGuk/values:batchGet" +
      "?ranges=Stats!A3:J700" + //matches
      "&ranges=Stats!L3:N20" + //hof
      "&key=" + process.env.GOOGLE_API_KEY;

    const res = await fetch(url);
    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
