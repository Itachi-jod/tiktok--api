const axios = require("axios");

module.exports = async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    // Info endpoint or missing URL
    return res.json({
      success: true,
      author: "ItachiXD",
      description: "TikTok video downloader API. Use /api/tiktok?url=<video_url> to get download link."
    });
  }

  try {
    console.log("Step 1: Fetch /gnstre");
    const initRes = await axios.get("https://ssstt.io/gnstre", {
      params: { url },
      headers: {
        authority: "ssstt.io",
        method: "GET",
        path: `/gnstre?url=${encodeURIComponent(url)}`,
        scheme: "https",
        accept: "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
        cookie: "_ga=GA1.1.1007605713.1761126941; _ga_W7G2HMMGNY=GS2.1.s1761126940501Sg1511761127812$/59$IOSho",
        referer: "https://ssstt.io/",
        "sec-ch-ua": `"Chromium";v="137", "Not/A)Brand";v="24"`,
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": `"Android"`,
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36"
      }
    });
    console.log("/gnstre response:", initRes.data);

    const { signature, timestamp } = initRes.data;

    console.log("Step 2: Fetch /c");
    const cRes = await axios.get("https://d.ssstt.io/c", {
      params: { url, signature, timestamp },
      headers: {
        authority: "d.ssstt.io",
        method: "GET",
        path: `/c?url=${encodeURIComponent(url)}&signature=${signature}&timestamp=${timestamp}`,
        scheme: "https",
        accept: "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
        origin: "https://ssstt.io",
        referer: "https://ssstt.io/",
        "sec-ch-ua": `"Chromium";v="137", "Not/A)Brand";v="24"`,
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": `"Android"`,
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36"
      }
    });
    console.log("/c response:", cRes.data);

    const video_id = cRes.data.video_id;
    console.log("Video ID:", video_id);

    console.log("Step 3: Fetch /p/{video_id}");
    const pRes = await axios.get(`https://d.ssstt.io/p/${video_id}`, {
      headers: {
        authority: "d.ssstt.io",
        method: "GET",
        path: `/p/${video_id}`,
        scheme: "https",
        accept: "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
        origin: "https://ssstt.io",
        referer: "https://ssstt.io/",
        "sec-ch-ua": `"Chromium";v="137", "Not/A)Brand";v="24"`,
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": `"Android"`,
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36"
      }
    });
    console.log("/p/{video_id} response:", JSON.stringify(pRes.data, null, 2));

    const download_links = pRes.data.download_links || {};
    const mp4 = download_links.mp4;

    return res.json({
      success: true,
      author: "ItachiXD",
      download_url: mp4
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Failed to fetch TikTok video" });
  }
};
