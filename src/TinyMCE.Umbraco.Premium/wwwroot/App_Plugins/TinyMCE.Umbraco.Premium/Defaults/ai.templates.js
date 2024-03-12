(function (config, undefined) {

    config.ai_request = {
        ai_request: (request, respondWith) => {
            const openAiOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Umbraco.Sys.ServerVariables.tinymcepremium.openAiApikey}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    temperature: 0.7,
                    max_tokens: 800,
                    messages: [{ role: 'user', content: request.prompt }],
                })
            };
            respondWith.string((signal) => window.fetch('https://api.openai.com/v1/chat/completions', { signal, ...openAiOptions })
                .then(async (response) => {
                    if (response) {
                        const data = await response.json();
                        if (data.error) {
                            throw new Error(`${data.error.type}: ${data.error.message}`);
                        } else if (response.ok) {
                            // Extract the response content from the data returned by the API
                            return data?.choices[0]?.message?.content?.trim();
                        }
                    } else {
                        throw new Error('Failed to communicate with the ChatGPT API');
                    }
                })
            );
        }
    };
}(window.tinymcepremium.Config = window.tinymcepremium.Config || {}));