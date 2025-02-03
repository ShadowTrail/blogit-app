// frontend/src/utils/fetcher.ts

const fetcher = async (url: string) => {
  const fullUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`;
  console.log(`Fetching URL: ${fullUrl}`);

  const token = localStorage.getItem("token"); // Or retrieve from context/state

  const res = await fetch(fullUrl, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error fetching data:", errorText);
    try {
      const errorData = JSON.parse(errorText);
      throw new Error(errorData.message || "Failed to fetch");
    } catch {
      throw new Error("Failed to fetch");
    }
  }

  const data = await res.json();
  console.log("Fetched Data:", data);
  return data;
};

export default fetcher;
