import  OpenAI from "openai"

const ClassifyImg = async (imgBase64) => {
    console.log(imgBase64)
    const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY, dangerouslyAllowBrowser: true});
    let title = ''
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: "Label this image in a single word",
                    },
                    {
                        type: "image_url",
                        image_url: {
                            url: `${imgBase64}`
                        }
                    }
                ]
            }
        ]
    })
    title = response.choices[0].message.content
    if (title.split(" ").length>2){
        return ''
    }
    console.log(typeof title)
    return title
}

export default ClassifyImg