export async function handler() {
  try {
    const url =
      "https://sheets.googleapis.com/v4/spreadsheets/1eAhYqy0og9IEGeijDHTxvCnpQN8MD1v1FmE1TTDNGuk/values:batchGet" +
      "?ranges=Players!A1:J19" + //players
      "&ranges=Players!M1:V80" + //matches
      "&ranges=Players!A22:J28" + //finals
      "&ranges=Players!B29:C30" + //checkSchedule
      "&ranges=Players!A79:B100" + //seasonElo
      "&ranges=Players!E79:F115" + //allTimeElo
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
