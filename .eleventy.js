import { EleventyRenderPlugin } from "@11ty/eleventy";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy("resources");
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPlugin(EleventyRenderPlugin);

  // posts 컬렉션
  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi.getFilteredByGlob("posts/**/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  // 태그 모음
  eleventyConfig.addCollection("tag_11ty", (collectionApi) => {
    return collectionApi.getFilteredByTag("11ty").sort((a, b) => {
      return b.date - a.date;
    });
  });

  eleventyConfig.addCollection("tag_express", (collectionApi) => {
    return collectionApi.getFilteredByTag("express").sort((a, b) => {
      return b.date - a.date;
    });
  });


  // 날짜 포맷 필터 추가
  eleventyConfig.addFilter("date", (dateObj) => {
    if (!(dateObj instanceof Date)) {
      dateObj = new Date(dateObj);
    }
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_output"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
}