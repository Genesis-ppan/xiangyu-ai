export default async function handler(req, res) {
    // 设置CORS头（仅开发调试用，生产环境可按需收紧）
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { character, systemPrompt, userMessage } = req.body;
    if (!character || !systemPrompt || !userMessage) {
        return res.status(400).json({ error: '缺少必要参数' });
    }

    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
        console.error('❌ DeepSeek API Key 未配置');
        return res.status(500).json({ error: '服务端配置错误' });
    }

    // 构建符合 DeepSeek API 格式的请求体（可在此处加入少量历史消息以增强连续性）
    const messages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
    ];

    const requestBody = {
        model: 'deepseek-chat',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500
    };

    try {
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('DeepSeek API 错误:', response.status, errorText);
            return res.status(response.status).json({ error: `DeepSeek API 返回错误: ${response.status}` });
        }

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content ?? '抱歉，暂时无法生成回答。';
        return res.status(200).json({ reply });
    } catch (error) {
        console.error('调用 DeepSeek API 时发生异常:', error);
        return res.status(500).json({ error: '内部服务错误' });
    }
}