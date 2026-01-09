export async function handler() {
  try {
    const url =
      "https://sheets.googleapis.com/v4/spreadsheets/1eAhYqy0og9IEGeijDHTxvCnpQN8MD1v1FmE1TTDNGuk/values:batchGet" +
      "?ranges=Table!A1:J30" + //players
      "&ranges=Schedule!A1:L200" + //matches
      "&ranges=Config!B2:E3" + //showSchedule
      "&ranges=Elo!A2:B20" + //seasonElo
      "&ranges=Elo!E2:F34" + //allTimeElo
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
