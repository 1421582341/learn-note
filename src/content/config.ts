import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	// 现在我们可以使用严格的校验，因为所有文件都有 frontmatter 了
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		// 转换日期字符串为 Date 对象
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

export default { blog };
