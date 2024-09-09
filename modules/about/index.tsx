export const questionCacheOptions: RequestInit =
  process.env.APP_ENV === "production"
    ? { next: { revalidate: 60 * 60 * 24 } }
    : { cache: "no-cache" };

export const fetchInQuestion = async <Response = any,>(url: string) => {
  console.log("🚀 ~ fetchInQuestion ~ url:", process.env.APP_ENV);

  try {
    const res = await fetch(
      `https://core.studygpt.app${url}`,
      questionCacheOptions
    );

    if (!res.ok) {
      // 由最近的 error.js 处理
      throw new Error(`Failed to fetch ${url} data`);
    }
    const parsed = await res.json();
    console.log(`🚀 ~ fetchQuestionDetail ${url} ~ parsed:`, parsed.code);

    return parsed as Promise<Response>;
  } catch (error) {
    console.error(`🚀 ~ fetchInQuestion ${url} ~ error:`, error);
    return null;
  }
};

export const fetchQuestionDetail = async (alias: string) => {
  return await fetchInQuestion(
    `/gpt-tool/api/retrieve_question?alias=${alias}`
  );
};

const About = async () => {
  const res = await fetchQuestionDetail(
    "21116431-kisa-gotami-again-goes-from-house-to-house-after-she-speaks-with-the"
  );

  console.log("🚀 ~ About ~ res:", res);

  return (
    <div>
      <h1>This is About Page</h1>
    </div>
  );
};

export default About;
