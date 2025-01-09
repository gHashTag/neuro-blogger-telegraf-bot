import { mainMenu } from '@/menu'
import { MyContext } from '../../interfaces'
import { errorMessage } from '@/helpers/error'

export async function handleQuestRules(ctx: MyContext) {
  try {
    const isRu = ctx.from?.language_code === 'ru'
    const message = isRu
      ? `🎓 <b>🌟 Добро пожаловать в наше обучение по боту "Нейроблоггер"</b>\n\n
В этом боте вы откроете для себя мир нейросетей и научитесь использовать их для создания и управления контентом. Все взаимодействие будет происходить с помощью нашего бота, который станет вашим цифровым наставником. 🤖\n\n
<b>🔑 Основные возможности бота:</b>\n
1. <b>📝 Создание контента с помощью ИИ:</b> Узнайте, как генерировать идеи и писать статьи с помощью ChatGPT.\n
2. <b>🔍 Редактирование и улучшение контента:</b> Используйте ИИ для проверки и оптимизации ваших текстов.\n
3. <b>🎨 Создание визуального контента:</b> Научитесь создавать изображения и видео с помощью нейросетей.\n
4. <b>💬 Интерактивное взаимодействие:</b> Взаимодействуйте с ботом, чтобы получить советы и рекомендации по улучшению вашего блога.\n\n
<b>🚀 Как начать:</b>\n
➕ Добавьте нашего бота в Telegram и следуйте инструкциям.\n
⚙️ Используйте команды бота для выполнения различных задач.\n
❓ Задавайте вопросы и получайте помощь в чате поддержки @neuro_blogger_group.\n\n
🌟 Удачи в использовании бота! Мы уверены, что вы достигнете новых высот! 🌟`
      : `🎓 <b>🌟 Welcome to our training on the "NeuroBlogger" bot.</b>\n\n
In this bot, you will discover the world of neural networks and learn how to use them to create and manage content. All interactions will be conducted with the help of our bot, which will be your digital mentor. 🤖\n\n
<b>🔑 Main features of the bot:</b>\n
1. <b>📝 Content creation with AI:</b> Learn how to generate ideas and write articles using ChatGPT.\n
2. <b>🔍 Editing and improving content:</b> Use AI to check and optimize your texts.\n
3. <b>🎨 Creating visual content:</b> Learn how to create images and videos using neural networks.\n
4. <b>💬 Interactive interaction:</b> Interact with the bot to get tips and recommendations for improving your blog.\n\n
<b>🚀 How to start:</b>\n
➕ Add our bot to Telegram and follow the instructions.\n
⚙️ Use the bot's commands to perform various tasks.\n
❓ Ask questions and get help in the support chat @neuro_blogger_group.\n\n
🌟 Good luck with using the bot! We are confident you will reach new heights! 🌟`

    await ctx.reply(message, { parse_mode: 'HTML' })
  } catch (error) {
    errorMessage(
      error,
      ctx.from?.id.toString(),
      ctx.from?.language_code === 'ru'
    )
    throw error
  }
}

export async function handleLevel0(ctx: MyContext) {
  try {
    const isRu = ctx.from?.language_code === 'ru'
    const message = isRu
      ? `🧠 <b>Команда: Мозг аватара (Avatar Brain)</b> 🌟\n\n
Эта команда поможет вам создать интеллектуальное ядро вашего аватара. Это "мозг" вашего аватара, который формирует его личность и профессиональные навыки. 🤖\n\n
<b>Шаг 1: Ввод информации о компании</b> 🏢\n
Пожалуйста, укажите название вашей компании. Например, 'NeuroBlogger'. Это поможет вашему аватару лучше понимать контекст, в котором он будет использоваться, и адаптировать свои ответы в соответствии с корпоративной культурой и ценностями.\n\n
<b>Шаг 2: Указание вашей должности</b> 💼\n
Введите вашу должность, например, 'Менеджер по продукту' или 'Разработчик программного обеспечения'. Это позволит вашему аватару учитывать ваши профессиональные обязанности и предоставлять более релевантные советы и рекомендации.\n\n
<b>Шаг 3: Описание ваших навыков</b> 🛠️\n
Перечислите ваши профессиональные навыки через запятую, например, 'управление проектами, блоггинг, анализ данных'. Это поможет вашему аватару демонстрировать ваши сильные стороны и предлагать решения, основанные на вашем опыте и компетенциях.\n\n
<b>Завершение:</b>\n
После того как вы предоставите всю необходимую информацию, наш бот обработает данные и создаст интеллектуальное ядро вашего аватара. Это позволит вашему аватару стать вашим цифровым помощником, который будет поддерживать вас в различных ситуациях, от профессиональных встреч до личных проектов. 🌐\n\n
<b>Преимущества:</b>\n
- 🎯 <b>Персонализация:</b> Ваш аватар будет адаптирован под ваши уникальные потребности и цели.\n
- 📈 <b>Эффективность:</b> Используйте аватар для оптимизации рабочих процессов и улучшения взаимодействия с клиентами.\n
- 🌟 <b>Инновации:</b> Внедряйте новые технологии и подходы в свою работу с помощью интеллектуального аватара.\n\n
`
      : `🧠 <b>Command: Avatar Brain</b> 🌟\n\n
This command will help you create the intellectual core of your avatar. This is the "brain" of your avatar, forming its personality and professional skills. 🤖\n\n
<b>Step 1: Enter company information</b> 🏢\n
Please specify the name of your company. For example, 'NeuroBlogger'. This will help your avatar better understand the context in which it will be used and adapt its responses according to corporate culture and values.\n\n
<b>Step 2: Specify your position</b> 💼\n
Enter your position, such as 'Product Manager' or 'Software Developer'. This will allow your avatar to consider your professional responsibilities and provide more relevant advice and recommendations.\n\n
<b>Step 3: Describe your skills</b> 🛠️\n
List your professional skills separated by commas, such as 'project management, blogging, data analysis'. This will help your avatar showcase your strengths and offer solutions based on your experience and competencies.\n\n
<b>Completion:</b>\n
Once you provide all the necessary information, our bot will process the data and create the intellectual core of your avatar. This will enable your avatar to become your digital assistant, supporting you in various situations, from professional meetings to personal projects. 🌐\n\n
<b>Benefits:</b>\n
- 🎯 <b>Personalization:</b> Your avatar will be tailored to your unique needs and goals.\n
- 📈 <b>Efficiency:</b> Use the avatar to optimize workflows and improve client interactions.\n
- 🌟 <b>Innovation:</b> Implement new technologies and approaches in your work with the help of an intelligent avatar.\n\n
`

    await ctx.reply(message, { parse_mode: 'HTML' })
  } catch (error) {
    console.error('Error in handleLevel0:', error)
    errorMessage(
      error,
      ctx.from?.id.toString(),
      ctx.from?.language_code === 'ru'
    )
    throw error
  }
}

export async function handleLevel1(ctx: MyContext) {
  try {
    const isRu = ctx.from?.language_code === 'ru'
    const message = isRu
      ? `🧑‍🎨 <b>Команда: Цифровое тело аватара (Digital Avatar Body)</b> 🌟\n\n
Эта команда поможет вам создать визуальный облик вашего аватара, который будет использоваться для генерации изображений и видео. Это "цифровое тело" вашего аватара, которое позволяет ему принимать уникальные формы и образы, отражая вашу индивидуальность. 🎭\n\n
Создание цифрового тела аватара с помощью технологии FLUX — это процесс, который позволяет вам персонализировать внешний вид вашего аватара, используя ваши фотографии. Это как создание цифрового двойника, который может быть использован в различных визуальных сценариях. 📸\n\n
<b>Процесс создания:</b>\n
1️⃣ <b>Выбор количества шагов обучения:</b>\n
Вы можете выбрать количество шагов обучения от 1000 до 6000. Чем больше шагов, тем более детализированным и реалистичным будет ваш аватар. 🔍\n\n
2️⃣ <b>Подготовка изображений:</b>\n
Вам потребуется минимум 10 фотографий, которые соответствуют следующим критериям:\n
   - 📷 <b>Четкость и качество изображения:</b> Фотографии должны быть четкими и высококачественными.\n
   - 🔄 <b>Разнообразие ракурсов:</b> Используйте фотографии, сделанные с разных ракурсов.\n
   - 😊 <b>Разнообразие выражений лиц:</b> Включите фотографии с различными выражениями лиц.\n
   - 💡 <b>Разнообразие освещения:</b> Используйте фотографии, сделанные при разных условиях освещения.\n
   - 🏞️ <b>Фон и окружение:</b> Фон на фотографиях должен быть нейтральным.\n
   - 👗 <b>Разнообразие стилей одежды:</b> Включите фотографии в разных нарядах.\n
   - 🎯 <b>Лицо в центре кадра:</b> Убедитесь, что ваше лицо занимает центральное место на фотографии.\n
   - 🚫 <b>Минимум постобработки:</b> Избегайте фотографий с сильной постобработкой.\n
   - ⏳ <b>Разнообразие возрастных периодов:</b> Включите фотографии, сделанные в разные возрастные периоды.\n\n
3️⃣ <b>Обучение модели:</b>\n
После загрузки изображений бот начнет процесс обучения, который может занять от 3 до 6 часов. ⏰\n\n
4️⃣ <b>Использование модели:</b>\n
После завершения обучения вы сможете использовать модель для создания уникальных изображений и видео с вашим аватаром, используя команду "Нейрофото" в главном меню бота. 🎨\n\n
Создание цифрового тела аватара — это важный шаг в персонализации вашего цифрового присутствия. 🌐`
      : `🧑‍🎨 <b>Command: Digital Avatar Body</b> 🌟\n\n
This command will help you create the visual appearance of your avatar, which will be used for generating images and videos. This is the "digital body" of your avatar, allowing it to take on unique forms and images, reflecting your individuality. 🎭\n\n
Creating a digital avatar body using FLUX technology is a process that allows you to personalize your avatar's appearance using your photos. It's like creating a digital twin that can be used in various visual scenarios. 📸\n\n
<b>Creation process:</b>\n
1️⃣ <b>Selecting the number of training steps:</b>\n
You can choose the number of training steps from 1000 to 6000. The more steps, the more detailed and realistic your avatar will be. 🔍\n\n
2️⃣ <b>Preparing images:</b>\n
You will need at least 10 photos that meet the following criteria:\n
   - 📷 <b>Clarity and quality of the image:</b> Photos should be clear and high-quality.\n
   - 🔄 <b>Variety of angles:</b> Use photos taken from different angles.\n
   - 😊 <b>Variety of facial expressions:</b> Include photos with different facial expressions.\n
   - 💡 <b>Variety of lighting:</b> Use photos taken under different lighting conditions.\n
   - 🏞️ <b>Background and environment:</b> The background should be neutral.\n
   - 👗 <b>Variety of clothing styles:</b> Include photos in different outfits.\n
   - 🎯 <b>Face centered in the frame:</b> Ensure your face is centered in the photo.\n
   - 🚫 <b>Minimal post-processing:</b> Avoid photos with heavy post-processing.\n
   - ⏳ <b>Variety of age periods:</b> Include photos taken at different ages.\n\n
3️⃣ <b>Training the model:</b>\n
After uploading the images, the bot will start the training process, which can take 3 to 6 hours. ⏰\n\n
4️⃣ <b>Using the model:</b>\n
After training, you can use the model to create unique images and videos with your avatar using the "NeuroPhoto" command in the bot's main menu. 🎨\n\n
Creating a digital avatar body is an important step in personalizing your digital presence. 🌐`

    await ctx.reply(message, { parse_mode: 'HTML' })
  } catch (error) {
    console.error('Error in handleLevel1:', error)
    errorMessage(
      error,
      ctx.from?.id.toString(),
      ctx.from?.language_code === 'ru'
    )
    throw error
  }
}

export async function handleLevel2(ctx: MyContext) {
  try {
    const isRu = ctx.from?.language_code === 'ru'
    const message = isRu
      ? `📸 <b>Команда: Нейрофото (NeuroPhoto)</b> 🌟\n\n
После создания цифрового тела аватара вы можете использовать его для создания <b>нейрофото</b>. Нейрофото — это изображения, созданные с использованием нейронных сетей, которые могут преобразовать текстовые описания в уникальные визуальные образы с вашим лицом. Это инновационный способ визуализировать ваши идеи и вдохновляться новыми концепциями. 💡\n\n
<b>Как начать:</b>\n
1️⃣ Выберите команду <b>"Нейрофото"</b> в главном меню бота.\n
2️⃣ Создайте текстовое описание, или <b>промпт</b>, который станет основой для генерации изображения. Чем более детализированным будет ваше описание, тем более точным и уникальным станет изображение. 🖋️\n\n
<b>Процесс генерации:</b>\n
Когда вы готовы, просто отправьте ваше текстовое описание нашему боту, и он начнет процесс генерации. Это может занять несколько секунд, так как бот использует сложные алгоритмы для создания изображения, которое соответствует вашему описанию. ⏳\n\n
<b>Результат:</b>\n
После завершения процесса вы получите ваше <b>нейрофото</b>. Это изображение можно использовать для различных целей: от личных проектов до профессиональных презентаций. Вы можете делиться ими с друзьями, использовать в социальных сетях или просто наслаждаться результатом. 🎉\n\n
<b>Дополнительные возможности:</b>\n
- 📥 <b>Скачать</b> изображение и использовать в своих проектах.\n
- 🔄 <b>Создать новые изображения</b> с помощью выбора цифры от 1 до 4 в меню.\n
- ✨ <b>Улучшить промпт</b> и создать новые изображения с помощью команды "Улучшить промпт".\n
- 📏 <b>Изменить размер</b> изображения, используя команду "Изменить размер".`
      : `📸 <b>Command: NeuroPhoto</b> 🌟\n\n
After creating the digital body of your avatar, you can use it to create <b>neurophotos</b>. Neurophotos are images created using neural networks that can transform text descriptions into unique visual images with your face. This is an innovative way to visualize your ideas and get inspired by new concepts. 💡\n\n
<b>How to start:</b>\n
1️⃣ Select the <b>"NeuroPhoto"</b> command in the bot's main menu.\n
2️⃣ Create a text description, or <b>prompt</b>, which will be the basis for generating the image. The more detailed your description, the more accurate and unique the image will be. 🖋️\n\n
<b>Generation process:</b>\n
When you're ready, just send your text description to our bot, and it will start the generation process. This may take a few seconds as the bot uses complex algorithms to create an image that matches your description. ⏳\n\n
<b>Result:</b>\n
After the process is complete, you will receive your <b>neurophoto</b>. This image can be used for various purposes: from personal projects to professional presentations. You can share them with friends, use them on social networks, or simply enjoy the result. 🎉\n\n
<b>Additional features:</b>\n
- 📥 <b>Download</b> the image and use it in your projects.\n
- 🔄 <b>Create new images</b> by selecting a number from 1 to 4 in the menu.\n
- ✨ <b>Improve the prompt</b> and create new images using the "Improve Prompt" command.\n
- 📏 <b>Resize</b> the image using the "Resize" command.`

    await ctx.reply(message, { parse_mode: 'HTML' })
  } catch (error) {
    console.error('Error in handleLevel2:', error)
    errorMessage(
      error,
      ctx.from?.id.toString(),
      ctx.from?.language_code === 'ru'
    )
    throw error
  }
}

export async function handleLevel3(ctx: MyContext) {
  try {
    const isRu = ctx.from?.language_code === 'ru'
    const message = isRu
      ? `🖼️ <b>Команда: Описание из изображения (Image to Prompt)</b> 🌟\n\n
Функция "Описание из изображения" позволяет вам преобразовать визуальные данные в текст, создавая промпт для нейрофото. Это может быть полезно для различных целей, таких как создание описаний для изображений, анализ контента или просто для развлечения. Особенно важно использовать эту функцию для улучшения качества нейрофото, так как детализированный промпт может значительно повысить точность и выразительность создаваемых изображений для вашего аватара. 💡\n\n
<b>Процесс использования:</b>\n
1️⃣ <b>Выбор изображения:</b>\n
   - Начните с выбора изображения, которое вдохновило вас на создание нейрофото. Это может быть любое изображение, например, фото супермена или русалки. Важно, чтобы изображение было четким и качественным, чтобы бот мог максимально точно интерпретировать его содержимое. 📷\n\n
2️⃣ <b>Отправка изображения:</b>\n
   - Отправьте выбранное изображение нашему боту. Это первый шаг в процессе преобразования визуальных данных в текст. 📤\n\n
3️⃣ <b>Анализ изображения:</b>\n
   - Бот начнет процесс анализа, используя сложные алгоритмы и нейронные сети для распознавания объектов и сцен на изображении. Это может занять некоторое время, но результат стоит ожидания. ⏳\n\n
4️⃣ <b>Получение текстового описания:</b>\n
   - После завершения анализа вы получите текстовое описание, которое максимально точно отражает содержимое изображения. Это описание может включать в себя детали, такие как цвета, формы, объекты и сцены, присутствующие на изображении. 📝\n\n
<b>Преимущества использования детализированного промпта:</b>\n
- 🎨 <b>Улучшение качества нейрофото:</b> Детализированный промпт позволяет создать более точные и выразительные нейрофото. Чем больше деталей в описании, тем лучше модель сможет воспроизвести вашу задумку.\n
- 🌈 <b>Создание уникальных изображений:</b> Используя промпт, основанный на референсном изображении, вы можете создавать уникальные изображения, которые точно соответствуют вашему видению.\n
- 🔍 <b>Анализ и понимание контента:</b> Полученное текстовое описание может быть использовано для анализа контента, создания метаданных или просто для того, чтобы лучше понять, что изображено на фотографии.\n
- ♿ <b>Поддержка для людей с ограниченными возможностями зрения:</b> Эта функция также может быть полезна для людей с ограниченными возможностями зрения, так как позволяет им получать текстовую информацию о визуальном контенте.\n\n
Использование функции "Описание из изображения" открывает новые возможности для творчества и самовыражения, позволяя вам создавать более качественные и детализированные нейрофото. 🚀`
      : `🖼️ <b>Command: Image to Prompt</b> 🌟\n\n
The "Image to Prompt" function allows you to convert visual data into text, creating a prompt for neurophotos. This can be useful for various purposes, such as creating image descriptions, content analysis, or just for fun. It is especially important to use this function to improve the quality of neurophotos, as a detailed prompt can significantly enhance the accuracy and expressiveness of the images created for your avatar. 💡\n\n
<b>Usage process:</b>\n
1️⃣ <b>Select an image:</b>\n
   - Start by selecting an image that inspired you to create a neurophoto. It can be any image, such as a photo of Superman or a mermaid. It is important that the image is clear and high-quality so that the bot can accurately interpret its content. 📷\n\n
2️⃣ <b>Send the image:</b>\n
   - Send the selected image to our bot. This is the first step in the process of converting visual data into text. 📤\n\n
3️⃣ <b>Image analysis:</b>\n
   - The bot will start the analysis process using complex algorithms and neural networks to recognize objects and scenes in the image. This may take some time, but the result is worth the wait. ⏳\n\n
4️⃣ <b>Receive text description:</b>\n
   - After the analysis is complete, you will receive a text description that accurately reflects the content of the image. This description may include details such as colors, shapes, objects, and scenes present in the image. 📝\n\n
<b>Benefits of using a detailed prompt:</b>\n
- 🎨 <b>Improving the quality of neurophotos:</b> A detailed prompt allows for more accurate and expressive neurophotos. The more details in the description, the better the model can reproduce your idea.\n
- 🌈 <b>Creating unique images:</b> By using a prompt based on a reference image, you can create unique images that precisely match your vision.\n
- 🔍 <b>Content analysis and understanding:</b> The obtained text description can be used for content analysis, metadata creation, or simply to better understand what is depicted in the photo.\n
- ♿ <b>Support for visually impaired people:</b> This function can also be useful for visually impaired people, as it allows them to receive textual information about visual content.\n\n
Using the "Image to Prompt" function opens up new possibilities for creativity and self-expression, allowing you to create higher quality and more detailed neurophotos. 🚀`

    await ctx.reply(message, { parse_mode: 'HTML' })
  } catch (error) {
    console.error('Error in handleLevel3:', error)
    errorMessage(
      error,
      ctx.from?.id.toString(),
      ctx.from?.language_code === 'ru'
    )
    throw error
  }
}

export async function handleLevel4(ctx: MyContext) {
  try {
    const isRu = ctx.from?.language_code === 'ru'
    const message = isRu
      ? `📏 <b>Команда: Изменение размера (Change Size)</b> 🌟\n\n
Функция "Изменение размера" позволяет вам легко адаптировать изображения с аватаром для различных платформ и нужд, будь то социальные сети, презентации или личные проекты. Это особенно важно в современном цифровом мире, где каждая платформа предъявляет свои уникальные требования к размерам изображений. 📱💻\n\n
<b>Зачем это нужно:</b>\n
Изменение размера изображения — это ключевой аспект работы с графикой, особенно когда речь идет о публикации в интернете. Разные платформы имеют свои стандарты и предпочтения. Например, Instagram часто использует квадратные изображения, в то время как YouTube предпочитает широкоформатные. Правильный размер изображения помогает улучшить его восприятие и взаимодействие с аудиторией. 🌐\n\n
<b>Предустановленные размеры:</b>\n
Наш бот предлагает вам выбрать из нескольких предустановленных размеров, каждый из которых имеет свои особенности и подходит для определенных целей:\n
- 📺 <b>16:9</b> — Идеально подходит для видео и презентаций, так как этот формат широко используется в кино и телевидении.\n
- 🔲 <b>1:1</b> — Квадратный формат, часто используемый в социальных сетях, таких как Instagram, для публикации фотографий и графики.\n
- 📱 <b>9:16</b> — Вертикальный формат, отлично подходящий для сторис и вертикальных видео на платформах, таких как TikTok и Instagram.\n\n
<b>Как это работает:</b>\n
Процесс изменения размера изображения с нашим ботом прост и интуитивно понятен. Все, что вам нужно сделать, это выбрать нужный размер из предложенных вариантов. Бот автоматически изменит размер вашего изображения, сохраняя его качество и пропорции. Это особенно полезно, если у вас нет доступа к профессиональным инструментам для редактирования изображений или если вы хотите быстро подготовить изображение для публикации. ⚙️\n\n
Использование функции "Изменение размера" позволяет вам легко адаптировать ваши изображения с аватаром под нужды различных платформ, обеспечивая их оптимальное отображение и взаимодействие с аудиторией. 🚀`
      : `📏 <b>Command: Change Size</b> 🌟\n\n
The "Change Size" function allows you to easily adapt avatar images for various platforms and needs, whether it's social media, presentations, or personal projects. This is especially important in today's digital world, where each platform has its unique image size requirements. 📱💻\n\n
<b>Why it's needed:</b>\n
Changing the size of an image is a key aspect of working with graphics, especially when it comes to online publishing. Different platforms have their standards and preferences. For example, Instagram often uses square images, while YouTube prefers widescreen. The correct image size helps improve its perception and interaction with the audience. 🌐\n\n
<b>Preset sizes:</b>\n
Our bot offers you a choice of several preset sizes, each with its features and suitable for specific purposes:\n
- 📺 <b>16:9</b> — Ideal for videos and presentations, as this format is widely used in film and television.\n
- 🔲 <b>1:1</b> — Square format, often used in social networks like Instagram for posting photos and graphics.\n
- 📱 <b>9:16</b> — Vertical format, perfect for stories and vertical videos on platforms like TikTok and Instagram.\n\n
<b>How it works:</b>\n
The process of changing the size of an image with our bot is simple and intuitive. All you need to do is select the desired size from the available options. The bot will automatically resize your image, preserving its quality and proportions. This is especially useful if you don't have access to professional image editing tools or if you want to quickly prepare an image for publication. ⚙️\n\n
Using the "Change Size" function allows you to easily adapt your avatar images to the needs of various platforms, ensuring their optimal display and interaction with the audience. 🚀`

    await ctx.reply(message, { parse_mode: 'HTML' })
  } catch (error) {
    console.error('Error in handleLevel4:', error)
    errorMessage(
      error,
      ctx.from?.id.toString(),
      ctx.from?.language_code === 'ru'
    )
    throw error
  }
}

export async function handleLevel5(ctx: MyContext) {
  try {
    const isRu = ctx.from?.language_code === 'ru'
    const message = isRu
      ? `🎤 <b>Команда: Голос для аватара (Voice for Avatar)</b> 🌟\n\n
Функция "Голос для аватара" открывает перед вами множество возможностей, делая ваш аватар более живым и выразительным. Это может быть полезно в презентациях, видео или просто для развлечения в коротких видеороликах, добавляя уникальность и индивидуальность вашему контенту. 🎬\n\n
<b>Как начать:</b>\n
1️⃣ <b>Запись голосового сообщения:</b>\n
Чтобы создать качественный голос для вашего аватара, следуйте следующим критериям:\n
   - 🎙️ <b>Выбор оборудования:</b> Желательно использовать хороший микрофон для записи. Это обеспечит высокое качество звука и минимизирует фоновый шум. Не критично, если такой возможности нет.\n
   - 🤫 <b>Тишина в помещении:</b> Записывайте голосовое сообщение в тихом помещении, где нет посторонних шумов. Закройте окна и двери, чтобы минимизировать звуки с улицы.\n
   - 🗣️ <b>Четкость произношения:</b> Говорите четко и ясно. Убедитесь, что каждое слово произносится правильно и разборчиво.\n
   - 🎭 <b>Интонация и эмоции:</b> Используйте различные интонации и эмоции в вашем голосе. Это сделает запись более выразительной и живой.\n
   - 🕒 <b>Темп речи:</b> Говорите в умеренном темпе. Найдите баланс, чтобы ваш голос звучал естественно и комфортно для восприятия.\n
   - 🔄 <b>Запись нескольких дублей:</b> Не стесняйтесь записывать несколько дублей. Это даст вам возможность выбрать лучший вариант.\n
   - 🔍 <b>Проверка качества записи:</b> После записи прослушайте ваше сообщение. Обратите внимание на качество звука и выразительность.\n
   - 🚫 <b>Избегайте постобработки:</b> Старайтесь не использовать сильную постобработку или эффекты на записи.\n
   - ⏱️ <b>Продолжительность:</b> Оптимальная продолжительность записи - сорок - шестьдесят секунд.\n\n
Следуя этим критериям, вы сможете создать более качественное голосовое сообщение для вашего аватара, что значительно повысит его выразительность и индивидуальность.\n\n
2️⃣ <b>Отправка голосового сообщения:</b>\n
   - После записи отправьте голосовое сообщение нашему боту. Бот начнет процесс создания голосового аватара, используя сложные алгоритмы и нейронные сети для анализа и обработки вашего голоса. 📤\n\n
3️⃣ <b>Получение голосового аватара:</b>\n
   - После завершения процесса вы получите готовый голосовой аватар. Вы можете использовать его в различных сценариях: от создания видеороликов и презентаций до использования в социальных сетях и мессенджерах. 📱\n\n
<b>Преимущества использования голосового аватара:</b>\n
- 🌟 <b>Уникальность и выразительность:</b> Голосовой аватар добавит вашему контенту уникальность и выразительность, привлекая внимание и вызывая интерес у вашей аудитории.\n
- ⏳ <b>Экономия времени:</b> Использование голосового аватара позволяет сэкономить время на озвучивание, предоставляя готовый аудиоконтент, который можно легко интегрировать в ваши проекты.\n\n
Функция "Голос для аватара" позволяет вам персонализировать ваш цифровой образ, делая его более интерактивным и запоминающимся для вашей аудитории. 🚀`
      : `🎤 <b>Command: Voice for Avatar</b> 🌟\n\n
The "Voice for Avatar" function opens up many possibilities, making your avatar more lively and expressive. This can be useful in presentations, videos, or just for fun in short clips, adding uniqueness and personality to your content. 🎬\n\n
<b>How to start:</b>\n
1️⃣ <b>Recording a voice message:</b>\n
To create a quality voice for your avatar, follow these criteria:\n
   - 🎙️ <b>Equipment selection:</b> It is advisable to use a good microphone for recording. This will ensure high sound quality and minimize background noise.\n
   - 🤫 <b>Silence in the room:</b> Record the voice message in a quiet room with no external noise. Close windows and doors to minimize outside sounds.\n
   - 🗣️ <b>Clarity of pronunciation:</b> Speak clearly and distinctly. Make sure each word is pronounced correctly and intelligibly.\n
   - 🎭 <b>Intonation and emotions:</b> Use different intonations and emotions in your voice. This will make the recording more expressive and lively.\n
   - 🕒 <b>Speech tempo:</b> Speak at a moderate pace. Find a balance so that your voice sounds natural and comfortable to perceive.\n
   - 🔄 <b>Recording multiple takes:</b> Don't hesitate to record multiple takes. This will give you the opportunity to choose the best option.\n
   - 🔍 <b>Checking recording quality:</b> After recording, listen to your message. Pay attention to sound quality and expressiveness.\n
   - 🚫 <b>Avoid post-processing:</b> Try not to use heavy post-processing or effects on the recording.\n
   - ⏱️ <b>Duration:</b> The optimal recording duration is forty to sixty seconds.\n\n
By following these criteria, you can create a higher quality voice message for your avatar, significantly enhancing its expressiveness and individuality.\n\n
2️⃣ <b>Sending the voice message:</b>\n
   - After recording, send the voice message to our bot. The bot will start the process of creating a voice avatar using complex algorithms and neural networks to analyze and process your voice. 📤\n\n
3️⃣ <b>Receiving the voice avatar:</b>\n
   - After the process is complete, you will receive a ready-made voice avatar. You can use it in various scenarios: from creating videos and presentations to using it in social networks and messengers. 📱\n\n
<b>Benefits of using a voice avatar:</b>\n
- 🌟 <b>Uniqueness and expressiveness:</b> A voice avatar will add uniqueness and expressiveness to your content, attracting attention and arousing interest in your audience.\n
- ⏳ <b>Time-saving:</b> Using a voice avatar saves time on voice-over, providing ready-made audio content that can be easily integrated into your projects.\n\n
The "Voice for Avatar" function allows you to personalize your digital image, making it more interactive and memorable for your audience. 🚀`

    await ctx.reply(message, { parse_mode: 'HTML' })
  } catch (error) {
    console.error('Error in handleLevel5:', error)
    errorMessage(
      error,
      ctx.from?.id.toString(),
      ctx.from?.language_code === 'ru'
    )
    throw error
  }
}

export async function handleLevel6(ctx: MyContext) {
  try {
    const isRu = ctx.from?.language_code === 'ru'
    const message = isRu
      ? `🗣️ <b>Команда: Текст в голос (Text to Voice)</b> 🌟\n\n
После того как вы обучили голосовой аватар в функции "Голос для аватара", вы можете использовать его для озвучивания текстовых сообщений. Это открывает новые возможности для создания аудиоконтента, который можно использовать в презентациях, видео или просто для развлечения. 🎧\n\n
<b>Как использовать:</b>\n
1️⃣ <b>Выбор команды:</b>\n
   - В главном меню бота выберите команду "Текст в голос". Это первый шаг для начала процесса озвучивания. 📜\n\n
2️⃣ <b>Отправка текстового сообщения:</b>\n
   - Напишите текстовое сообщение, которое вы хотите преобразовать в голос. Это может быть любое сообщение, которое вы хотите озвучить. Убедитесь, что текст четкий и понятный, чтобы конечный результат был максимально впечатляющим. Отправьте текст нашему боту. ✍️\n\n
3️⃣ <b>Преобразование текста в голос:</b>\n
   - После отправки текста бот начнет процесс преобразования, используя ваш голосовой аватар. Это позволяет создать аудиофайл, который точно передает интонации и стиль вашего аватара. 🔄\n\n
4️⃣ <b>Получение аудиофайла:</b>\n
   - После завершения процесса вы получите готовый аудиофайл. Вы можете использовать его в различных сценариях: от презентаций и видео до использования в социальных сетях и мессенджерах. 📥\n\n
<b>Преимущества использования функции "Текст в голос":</b>\n
- 🎨 <b>Персонализация контента:</b> Использование вашего голосового аватара для озвучивания текста добавляет уникальность и индивидуальность вашему контенту.\n
- ⚡ <b>Удобство и эффективность:</b> Быстрое преобразование текста в голос позволяет сэкономить время и усилия на создание аудиоконтента.\n\n
Функция "Текст в голос" делает ваш цифровой контент более живым и выразительным, предоставляя вам возможность легко интегрировать аудиофайлы в ваши проекты. 🚀`
      : `🗣️ <b>Command: Text to Voice</b> 🌟\n\n
After training your voice avatar in the "Voice for Avatar" function, you can use it to voice text messages. This opens up new possibilities for creating audio content that can be used in presentations, videos, or just for fun. 🎧\n\n
<b>How to use:</b>\n
1️⃣ <b>Select the command:</b>\n
   - In the bot's main menu, select the "Text to Voice" command. This is the first step to start the voicing process. 📜\n\n
2️⃣ <b>Send a text message:</b>\n
   - Write the text message you want to convert to voice. It can be any message you want to voice. Make sure the text is clear and understandable so that the final result is as impressive as possible. Send the text to our bot. ✍️\n\n
3️⃣ <b>Convert text to voice:</b>\n
   - After sending the text, the bot will start the conversion process using your voice avatar. This allows you to create an audio file that accurately conveys the intonations and style of your avatar. 🔄\n\n
4️⃣ <b>Receive the audio file:</b>\n
   - After the process is complete, you will receive a ready-made audio file. You can use it in various scenarios: from presentations and videos to use in social networks and messengers. 📥\n\n
<b>Benefits of using the "Text to Voice" function:</b>\n
- 🎨 <b>Content personalization:</b> Using your voice avatar to voice text adds uniqueness and individuality to your content.\n
- ⚡ <b>Convenience and efficiency:</b> Fast text-to-voice conversion saves time and effort in creating audio content.\n\n
The "Text to Voice" function makes your digital content more lively and expressive, providing you with the opportunity to easily integrate audio files into your projects. 🚀`

    await ctx.reply(message, { parse_mode: 'HTML' })
  } catch (error) {
    console.error('Error in handleLevel6:', error)
    errorMessage(
      error,
      ctx.from?.id.toString(),
      ctx.from?.language_code === 'ru'
    )
    throw error
  }
}

export async function handleLevel7(ctx: MyContext) {
  try {
    const isRu = ctx.from?.language_code === 'ru'
    const message = isRu
      ? `🤖 <b>Команда: Выбор модели ИИ (Select AI Model)</b> 🌟\n\n
Функция "Выбор модели ИИ" предоставляет вам возможность выбрать наиболее подходящую модель для выполнения различных задач, таких как генерация текста, изображений или видео. Правильный выбор модели может значительно повысить качество и точность результатов, которые вы получаете от бота. 🎯\n\n
<b>Как это работает:</b>\n
1️⃣ <b>Вызов команды выбора модели:</b>\n
   - Начните с вызова команды выбора модели в интерфейсе бота. Это первый шаг для настройки вашего взаимодействия с ИИ. 🛠️\n\n
2️⃣ <b>Ознакомление с доступными моделями:</b>\n
   - Бот предложит вам список доступных моделей, каждая из которых обладает уникальными характеристиками и возможностями. Например, одна модель может быть оптимизирована для генерации креативного текста, в то время как другая может быть более эффективной для аналитических задач или создания визуального контента. 📜\n\n
3️⃣ <b>Выбор модели:</b>\n
   - Выберите модель, которая лучше всего соответствует вашим потребностям и задачам. Это позволит вам адаптировать работу бота под ваши конкретные требования. 🎨\n\n
4️⃣ <b>Использование выбранной модели:</b>\n
   - После выбора модели бот предоставит вам возможность использовать её для выполнения ваших задач. Это может включать в себя генерацию текста, создание изображений или видео, а также другие функции, которые поддерживает выбранная модель. 🚀\n\n
<b>Преимущества выбора модели ИИ:</b>\n
- 🎯 <b>Персонализация взаимодействия:</b> Выбор модели позволяет вам персонализировать взаимодействие с ботом, обеспечивая более точные и релевантные результаты.\n
- ⚙️ <b>Оптимизация задач:</b> Использование подходящей модели для конкретных задач может значительно улучшить эффективность и качество выполнения этих задач.\n\n
Функция "Выбор модели ИИ" открывает перед вами возможность более гибкого и эффективного использования возможностей бота, адаптируя его работу под ваши индивидуальные нужды. 🌐`
      : `🤖 <b>Command: Select AI Model</b> 🌟\n\n
The "Select AI Model" function allows you to choose the most suitable model for performing various tasks, such as generating text, images, or videos. Choosing the right model can significantly enhance the quality and accuracy of the results you get from the bot. 🎯\n\n
<b>How it works:</b>\n
1️⃣ <b>Call the model selection command:</b>\n
   - Start by calling the model selection command in the bot interface. This is the first step to setting up your interaction with AI. 🛠️\n\n
2️⃣ <b>Familiarize yourself with available models:</b>\n
   - The bot will offer you a list of available models, each with unique characteristics and capabilities. For example, one model may be optimized for generating creative text, while another may be more effective for analytical tasks or creating visual content. 📜\n\n
3️⃣ <b>Select a model:</b>\n
   - Choose the model that best suits your needs and tasks. This will allow you to tailor the bot's work to your specific requirements. 🎨\n\n
4️⃣ <b>Use the selected model:</b>\n
   - After selecting a model, the bot will provide you with the opportunity to use it for your tasks. This may include generating text, creating images or videos, and other functions supported by the selected model. 🚀\n\n
<b>Benefits of selecting an AI model:</b>\n
- 🎯 <b>Personalization of interaction:</b> Selecting a model allows you to personalize interaction with the bot, ensuring more accurate and relevant results.\n
- ⚙️ <b>Task optimization:</b> Using the appropriate model for specific tasks can significantly improve the efficiency and quality of performing these tasks.\n\n
The "Select AI Model" function opens up the possibility of more flexible and efficient use of the bot's capabilities, adapting its work to your individual needs. 🌐`

    await ctx.reply(message, { parse_mode: 'HTML' })
  } catch (error) {
    console.error('Error in handleLevel7:', error)
    errorMessage(
      error,
      ctx.from?.id.toString(),
      ctx.from?.language_code === 'ru'
    )
    throw error
  }
}

export async function handleLevel8(ctx: MyContext) {
  try {
    const isRu = ctx.from?.language_code === 'ru'
    const message = isRu
      ? `💬 <b>Команда: Общение с аватаром (Chat with Your Avatar)</b> 🌟\n\n
После выбора модели ИИ вы можете начать общение с вашим аватаром, что открывает перед вами новые горизонты для взаимодействия и персонализации. Эта функция позволяет вам вести диалог с аватаром, который способен отвечать на ваши вопросы, давать советы или просто поддерживать дружескую беседу. 🤖\n\n
Чтобы начать, просто напишите сообщение в чат, и ваш аватар ответит вам, используя выбранную модель ИИ для генерации ответов. Это делает общение более естественным и увлекательным. Вы можете задавать вопросы на самые разные темы, делиться своими мыслями или просто вести непринужденную беседу с улучшенной версией себя. 🗨️\n\n
Ваш аватар может быть настроен на определенный стиль общения — формальный или неформальный — в зависимости от ваших предпочтений. Это позволяет создать уникальный опыт взаимодействия, который соответствует вашему стилю и интересам. 🎨\n\n
Общение с аватаром может быть полезным в самых разных сценариях: от обучения и развлечения до терапии. Вы можете использовать эту функцию для получения советов, изучения новых тем или просто для того, чтобы расслабиться и насладиться беседой. 📚\n\n
Мы гордимся тем, что можем предложить вам такой инновационный инструмент, и надеемся, что он станет незаменимым помощником в вашем повседневном взаимодействии. Не стесняйтесь экспериментировать с различными стилями общения и темами, чтобы найти те, которые лучше всего подходят для ваших нужд.`
      : `💬 <b>Command: Chat with Your Avatar</b> 🌟\n\n
After selecting an AI model, you can start chatting with your avatar, opening up new horizons for interaction and personalization. This feature allows you to have a dialogue with your avatar, which can answer your questions, give advice, or just engage in friendly conversation. 🤖\n\n
To start, simply write a message in the chat, and your avatar will respond using the selected AI model to generate replies. This makes communication more natural and enjoyable. You can ask questions on various topics, share your thoughts, or just have a casual chat with an enhanced version of yourself. 🗨️\n\n
Your avatar can be set to a specific communication style—formal or informal—depending on your preferences. This allows for a unique interaction experience that matches your style and interests. 🎨\n\n
Chatting with your avatar can be useful in various scenarios: from learning and entertainment to therapy. You can use this feature to get advice, explore new topics, or simply relax and enjoy the conversation. 📚\n\n
We are proud to offer you such an innovative tool and hope it becomes an indispensable assistant in your daily interactions. Feel free to experiment with different communication styles and topics to find what best suits your needs.`

    await ctx.reply(message, { parse_mode: 'HTML' })
  } catch (error) {
    console.error('Error in handleLevel8:', error)
    errorMessage(
      error,
      ctx.from?.id.toString(),
      ctx.from?.language_code === 'ru'
    )
    throw error
  }
}

export async function handleLevel9(ctx: MyContext) {
  try {
    const isRu = ctx.from?.language_code === 'ru'
    const message = isRu
      ? `🎥 <b>Команда: Изображение в видео (Image to Video)</b> 🌟\n\n
Функция "Изображение в видео" позволяет вам оживить статические изображения с вашим аватаром, добавляя к ним движение и динамику. Это открывает новые горизонты для творчества и самовыражения, превращая ваши идеи в захватывающие видеоролики. 🎬\n\n
<b>Процесс использования:</b>\n
1️⃣ <b>Выбор модели генерации видео:</b>\n
   - Начните с выбора модели генерации видео. Наш бот предлагает несколько предустановленных моделей, каждая из которых обладает уникальными характеристиками и стилем. Выберите модель, которая лучше всего соответствует вашим потребностям и предпочтениям. Например, одна модель может быть более подходящей для создания плавных и реалистичных движений, в то время как другая может добавить художественные эффекты и стилизацию. 🎨\n\n
2️⃣ <b>Загрузка изображения:</b>\n
   - Следующим шагом будет загрузка изображения, которое вы хотите преобразовать в видео. Это может быть любое изображение, которое вы хотите оживить. Убедитесь, что изображение имеет хорошее качество, чтобы конечный результат был максимально впечатляющим. Отправьте его нашему боту, и он начнет процесс преобразования. 📤\n\n
3️⃣ <b>Описание желаемого движения:</b>\n
   - Вам будет предложено описать желаемое движение в видео. Это может быть что угодно — от легкого колыхания листьев на ветру до сложных анимаций, таких как танцующие фигуры или движущиеся облака. Чем более детализированным будет ваше описание, тем более точным и уникальным будет конечное видео. Бот использует это описание, чтобы создать анимацию, которая соответствует вашему видению. 📝\n\n
4️⃣ <b>Генерация видео:</b>\n
   - После отправки описания движения бот начнет процесс генерации видео. Это может занять некоторое время, так как бот использует сложные алгоритмы и нейронные сети для создания анимации. Но результат стоит ожидания — вы получите уникальное видео, которое можно использовать для различных целей: от личных проектов до профессиональных презентаций. 🚀\n\n
Функция "Изображение в видео" позволяет вам воплотить ваши идеи в динамичные видеоролики, добавляя глубину и выразительность вашим проектам. 🎥\n\n
Здесь мы завершаем и вперёд к практическим заданиям. Пробуйте и экспериментируйте!`
      : `🎥 <b>Command: Image to Video</b> 🌟\n\n
The "Image to Video" function allows you to bring static images with your avatar to life by adding movement and dynamics. This opens up new horizons for creativity and self-expression, turning your ideas into captivating videos. 🎬\n\n
<b>Usage process:</b>\n
1️⃣ <b>Select a video generation model:</b>\n
   - Start by selecting a video generation model. Our bot offers several preset models, each with unique characteristics and style. Choose the model that best suits your needs and preferences. For example, one model may be more suitable for creating smooth and realistic movements, while another may add artistic effects and stylization. 🎨\n\n
2️⃣ <b>Upload an image:</b>\n
   - The next step is to upload the image you want to convert into a video. It can be any image you want to animate. Make sure the image is of good quality so that the final result is as impressive as possible. Send it to our bot, and it will start the conversion process. 📤\n\n
3️⃣ <b>Describe the desired movement:</b>\n
   - You will be prompted to describe the desired movement in the video. It can be anything from a gentle swaying of leaves in the wind to complex animations like dancing figures or moving clouds. The more detailed your description, the more accurate and unique the final video will be. The bot uses this description to create an animation that matches your vision. 📝\n\n
4️⃣ <b>Generate the video:</b>\n
   - After sending the movement description, the bot will start the video generation process. This may take some time as the bot uses complex algorithms and neural networks to create the animation. But the result is worth the wait — you will receive a unique video that can be used for various purposes: from personal projects to professional presentations. 🚀\n\n
The "Image to Video" function allows you to bring your ideas to life in dynamic videos, adding depth and expressiveness to your projects. 🎥\n\n
Here we conclude and move on to practical tasks. Try and experiment!`

    await ctx.reply(message, { parse_mode: 'HTML' })
  } catch (error) {
    console.error('Error in handleLevel9:', error)
    errorMessage(
      error,
      ctx.from?.id.toString(),
      ctx.from?.language_code === 'ru'
    )
    throw error
  }
}

export async function handleLevel10(ctx: MyContext) {
  try {
    const isRu = ctx.from?.language_code === 'ru'
    const message = isRu
      ? `🖼️ <b>Команда: Изображение из текста (Text to Image)</b> 🌟\n\n
Эта функция позволяет вам воплотить ваши идеи в визуальную форму, используя всего лишь текстовое описание. Это невероятно мощный инструмент, который открывает множество возможностей для творчества и самовыражения. 🎨\n\n
При использовании функции "Изображение из текста" у вас есть возможность выбрать одну из нескольких моделей, каждая из которых обладает уникальными характеристиками и стилем генерации изображений. Это позволяет вам адаптировать процесс создания изображений под ваши конкретные нужды и предпочтения. Рассмотрим доступные модели на момент записи этого видео:\n\n
1️⃣ <b>Flux 1.1Pro Ultra</b>\n
   - <b>Описание:</b> Эта модель известна своей способностью создавать изображения с высокой детализацией и реализмом. Она идеально подходит для сложных и детализированных описаний, где важны точность и качество.\n
   - <b>Применение:</b> Используйте Flux 1.1Pro Ultra для создания изображений, требующих высокой степени детализации, таких как архитектурные сцены или портреты.\n\n
2️⃣ <b>SDXL</b>\n
   - <b>Описание:</b> SDXL специализируется на создании изображений с яркими цветами и контрастами. Она отлично подходит для художественных и креативных проектов, где важна выразительность.\n
   - <b>Применение:</b> Выбирайте SDXL для создания ярких и насыщенных изображений, таких как пейзажи или абстрактные композиции.\n\n
3️⃣ <b>SD 3.5 Turbo</b>\n
   - <b>Описание:</b> Эта модель оптимизирована для быстрого создания изображений, сохраняя при этом хорошее качество. Она подходит для проектов, где важна скорость генерации.\n
   - <b>Применение:</b> Используйте SD 3.5 Turbo, когда вам нужно быстро получить изображение, например, для социальных сетей или презентаций.\n\n
4️⃣ <b>Recraft v3</b>\n
   - <b>Описание:</b> Recraft v3 известна своей способностью к стилизации изображений, добавляя уникальные художественные эффекты. Она подходит для создания изображений с особым стилем и атмосферой.\n
   - <b>Применение:</b> Выбирайте Recraft v3 для создания изображений с уникальным художественным стилем, таких как иллюстрации или концепт-арт.\n\n
5️⃣ <b>Photon</b>\n
   - <b>Описание:</b> Photon фокусируется на создании изображений с реалистичным освещением и тенями. Она идеально подходит для сцен, где важна игра света и тени.\n
   - <b>Применение:</b> Используйте Photon для создания изображений, где освещение играет ключевую роль, таких как закаты или ночные сцены.\n\n
Выбор модели зависит от ваших целей и предпочтений. Экспериментируйте с различными моделями, чтобы найти ту, которая лучше всего подходит для вашего проекта. Это позволит вам максимально эффективно использовать функцию "Изображение из текста" и создавать уникальные визуальные образы, которые точно отражают ваши идеи.\n\n
Представьте себе, что вы хотите создать изображение, которое передает атмосферу заката над океаном. Вы просто вводите текст 'закат над океаном', и наш бот начинает работать. Он анализирует ваше описание и создает изображение, которое максимально точно отражает вашу задумку. Это изображение может включать в себя яркие оранжевые и розовые оттенки неба, отражающиеся в спокойных водах океана, создавая ощущение умиротворения и красоты.\n\n
Но это только начало. Вы можете экспериментировать с различными описаниями, чтобы увидеть, как они воплощаются в жизнь. Например, попробуйте ввести 'заснеженные горы под звездным небом' или 'городская улица в дождливый день'. Каждый раз вы будете получать уникальное изображение, которое можно использовать для различных целей — от личных проектов до профессиональных презентаций. 🚀`
      : `🖼️ <b>Command: Text to Image</b> 🌟\n\n
This function allows you to bring your ideas to life in visual form using just a text description. It's an incredibly powerful tool that opens up many possibilities for creativity and self-expression. 🎨\n\n
When using the "Text to Image" function, you have the option to choose from several models, each with unique characteristics and image generation styles. This allows you to tailor the image creation process to your specific needs and preferences. Let's look at the available models at the time of this recording:\n\n
1️⃣ <b>Flux 1.1Pro Ultra</b>\n
   - <b>Description:</b> This model is known for its ability to create highly detailed and realistic images. It is ideal for complex and detailed descriptions where accuracy and quality are important.\n
   - <b>Application:</b> Use Flux 1.1Pro Ultra for creating images that require a high degree of detail, such as architectural scenes or portraits.\n\n
2️⃣ <b>SDXL</b>\n
   - <b>Description:</b> SDXL specializes in creating images with vibrant colors and contrasts. It is perfect for artistic and creative projects where expressiveness is important.\n
   - <b>Application:</b> Choose SDXL for creating bright and saturated images, such as landscapes or abstract compositions.\n\n
3️⃣ <b>SD 3.5 Turbo</b>\n
   - <b>Description:</b> This model is optimized for fast image creation while maintaining good quality. It is suitable for projects where generation speed is important.\n
   - <b>Application:</b> Use SD 3.5 Turbo when you need to quickly get an image, for example, for social media or presentations.\n\n
4️⃣ <b>Recraft v3</b>\n
   - <b>Description:</b> Recraft v3 is known for its ability to stylize images, adding unique artistic effects. It is suitable for creating images with a special style and atmosphere.\n
   - <b>Application:</b> Choose Recraft v3 for creating images with a unique artistic style, such as illustrations or concept art.\n\n
5️⃣ <b>Photon</b>\n
   - <b>Description:</b> Photon focuses on creating images with realistic lighting and shadows. It is ideal for scenes where the play of light and shadow is important.\n
   - <b>Application:</b> Use Photon for creating images where lighting plays a key role, such as sunsets or night scenes.\n\n
The choice of model depends on your goals and preferences. Experiment with different models to find the one that best suits your project. This will allow you to make the most of the "Text to Image" function and create unique visual images that accurately reflect your ideas.\n\n
Imagine you want to create an image that conveys the atmosphere of a sunset over the ocean. You simply enter the text 'sunset over the ocean', and our bot gets to work. It analyzes your description and creates an image that most accurately reflects your idea. This image may include bright orange and pink hues of the sky reflected in the calm waters of the ocean, creating a sense of tranquility and beauty.\n\n
But this is just the beginning. You can experiment with different descriptions to see how they come to life. For example, try entering 'snow-capped mountains under a starry sky' or 'city street on a rainy day'. Each time you will receive a unique image that can be used for various purposes — from personal projects to professional presentations. 🚀`

    await ctx.reply(message, { parse_mode: 'HTML' })
  } catch (error) {
    console.error('Error in handleLevel10:', error)
    errorMessage(
      error,
      ctx.from?.id.toString(),
      ctx.from?.language_code === 'ru'
    )
    throw error
  }
}

export async function handleLevel11(ctx: MyContext) {
  try {
    const isRu = ctx.from?.language_code === 'ru'
    const message = isRu
      ? `🎉 Пригласите друга и получите бонусы! 🎉

Хотите получить больше возможностей с нашим ботом? Теперь это проще простого! Используйте команду /invite, чтобы пригласить своих друзей и получить крутые бонусы! 🎁✨

🤝 Как это работает?
1. Введите команду /invite в нашем боте.
2. Поделитесь уникальной ссылкой с друзьями.
3. Получите бонусы, когда ваши друзья начнут использовать бота!

🎁 Что вы получите?
Дополнительные звезды для использования в боте.
Эксклюзивные функции и возможности.
Повышение уровня и доступ к новым функциям.

👥 Почему это здорово?
Делитесь полезным инструментом с друзьями.
Получайте награды за активность.
Расширяйте сообщество пользователей и открывайте новые горизонты вместе!`
      : `🎉 Invite friends and get bonuses! 🎉

Want to get more features with our bot? Now it's easier than ever! Use the /invite command to invite your friends and get cool bonuses! 🎁✨

🤝 How does it work?
1. Enter the /invite command in our bot.
2. Share a unique link with your friends.
3. Get bonuses when your friends start using the bot!

🎁 What do you get?
Additional stars for use in the bot.
Exclusive features and capabilities.
Level up and access to new features.

👥 Why is it great?
Share a useful tool with your friends.
Get rewards for activity.
Expand the user community and open new horizons together!`

    await ctx.reply(message)
    return
  } catch (error) {
    console.error('Error in handleLevel11:', error)
    errorMessage(
      error,
      ctx.from?.id.toString(),
      ctx.from?.language_code === 'ru'
    )
    throw error
  }
}

export async function handleQuestComplete(ctx: MyContext) {
  try {
    const isRu = ctx.from?.language_code === 'ru'
    const message = isRu
      ? `🎉 НейроКвест завершен! 🎉

Вы успешно прошли все задания и достигли максимального уровня! 🌟✨

🎁 Вам доступны новые функции и возможности в нашем боте.

👥 Спасибо, что были с нами!

🍀 Удачи в прохождении! 🍀

💵 На вашем балансе 100 ⭐️. Используйте его, чтобы открыть новые возможности!`
      : `🎉 NeuroQuest completed! 🎉

You have successfully completed all tasks and reached the maximum level! 🌟✨

🎁 You have access to new features and capabilities in our bot.

👥 Thank you for being with us!

🍀 Good luck in the quest! 🍀

💵 You have 100 ⭐️ on your balance. Use it to unlock new features!`

    await ctx.reply(message, {
      reply_markup: {
        keyboard: mainMenu(isRu).reply_markup.keyboard,
      },
    })
    return
  } catch (error) {
    console.error('Error in handleQuestComplete:', error)
    errorMessage(
      error,
      ctx.from?.id.toString(),
      ctx.from?.language_code === 'ru'
    )
    throw error
  }
}
